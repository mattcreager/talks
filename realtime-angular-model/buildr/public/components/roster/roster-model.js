/* global angular, EventEmitter, _, Q */

(function() { 'use strict';

function Roster(futureRosterData) {
  this.suggestions = Roster.$suggestions.$sync();
  this.$unwrap(futureRosterData);
}

Roster.$factory = [
  '$timeout',
  'bdResource',
  'bdSuggestions',
  'bdUnit',
  function($timeout, Resource, suggestions, Unit) {
    _.extend(Roster, {
      $$resource: new Resource('/rosters'),
      $timeout: $timeout,
      $suggestions: suggestions,
      $Unit: Unit
    });

    return Roster;
  }];

angular.module('Buildr').factory('bdRoster', Roster.$factory);

Roster.$find = function(uid) {
  return new Roster(this.$$resource.find(uid));
};

Roster.prototype.$getUnits = function() {
  var self = this;

  return this.$futureRosterData.get('units').then(function(rosterUnits) {
    var units  = _.reduce(rosterUnits, function(a, rosterUnit) {
      var unit = Roster.$Unit.$find(rosterUnit.id);
      _.extend(unit, rosterUnit);
      a.push(unit);
      return a;
    }, []);

    Roster.$timeout(function() {
      self.units = units;
    });

    return Q.all(_.pluck(units, '$futureUnitData')).then(function() {
      self.$$emitter.emit('update');
      return self.units;
    });
  });
};

Roster.prototype.$unwrap = function(futureRosterData) {
  var self = this;

  this.$futureRosterData = futureRosterData;
  this.$futureRosterData.then(function(data) {
    Roster.$timeout(function() { _.extend(self, data); });
  });
};

Roster.prototype.$inc = function(unit) {
  unit = _.find(this.units, { id: unit.id });
  unit.count++;

  return this.$saveUnits();
};

Roster.prototype.$dec = function(unit) {
  unit.count--;

  return this.$saveUnits();
};

Roster.prototype.$add = function(unit) {
  if (_.contains(_.pluck(this.units, 'id'), unit.id)) return this.$inc(unit);

  unit.count = 1;
  this.units.push(unit);

  return this.$saveUnits();
};

Roster.prototype.$remove = function(unit) {
  if (unit.count > 1) return this.$dec(unit);

  this.units.splice(this.units.indexOf(unit), 1);

  return this.$saveUnits();
};

Roster.prototype.$saveUnits = function() {
  var units = _.map(this.units, function(unit) {
    return _.pick(unit, ['id', 'count']);
  });

  return Roster.$$resource.set(this.id, { units: units });
};

Roster.prototype.$suggest = function(unit) {
  if (_.contains(_.pluck(this.units, 'id'), unit.id)) return;

  unit.count = 1;
  this.suggestions.$addSuggestion(unit);
};

Roster.prototype.$acceptSuggestion = function(unit) {
  var self = this;

  return this.suggestions.$removeSuggestion(unit).then(function() {
     return self.$add(unit);
  });
};

Roster.prototype.$declineSuggestion = function(unit) {
  return this.suggestions.$removeSuggestion(unit);
};

})();
