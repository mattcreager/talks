/* global angular, EventEmitter, _, Q */

(function() { 'use strict';

function RosterModel(futureRosterData) {
  if (!futureRosterData.inspect) {
    _.extend(this, futureRosterData);
    return;
  }

  this.$futureRosterData = futureRosterData;
  this.$unwrap(futureRosterData);
  this.suggestions = RosterModel.$suggestions.$sync();
}

RosterModel.$factory = [
  '$timeout',
  'bdResource',
  'bdSuggestions',
  'UnitModel',
  function($timeout, Resource, suggestions, Unit) {
    _.extend(RosterModel, {
      $$resource: new Resource('/rosters'),
      $timeout: $timeout,
      $suggestions: suggestions,
      $Unit: Unit
    });

    return RosterModel;
  }];

angular.module('Buildr').factory('RosterModel', RosterModel.$factory);

RosterModel.$find = function(uid) {
  var futureRosterData = this.$$resource.find(uid);

  if (uid) return new RosterModel(futureRosterData);
};

RosterModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

RosterModel.prototype.$getUnits = function() {
  var self = this;

  return this.$futureRosterData.get('units').then(function(rosterUnits) {
    var units  = _.reduce(rosterUnits, function(a, rosterUnit) {
      var unit = RosterModel.$Unit.$find(rosterUnit.id);
      _.extend(unit, rosterUnit);
      a.push(unit);
      return a;
    }, []);

    RosterModel.$timeout(function() {
      self.units = units;
    });

    return Q.all(_.pluck(units, '$futureUnitData')).then(function() {
      self.$$emitter.emit('update');
      return self.units;
    });
  });
};

RosterModel.prototype.$unwrap = function() {
  var self = this;

  this.$futureRosterData.then(function(data) {
    RosterModel.$timeout(function() { _.extend(self, data); });
  });
};

RosterModel.prototype.$inc = function(unit) {
  unit = _.find(this.units, { id: unit.id });
  unit.count++;

  return this.$saveUnits();
};

RosterModel.prototype.$dec = function(unit) {
  unit.count--;

  return this.$saveUnits();
};

RosterModel.prototype.$add = function(unit) {
  if (_.contains(_.pluck(this.units, 'id'), unit.id)) return this.$inc(unit);

  unit.count = 1;
  this.units.push(unit);

  return this.$saveUnits();
};

RosterModel.prototype.$remove = function(unit) {
  if (unit.count > 1) return this.$dec(unit);

  this.units.splice(this.units.indexOf(unit), 1);

  return this.$saveUnits();
};

RosterModel.prototype.$saveUnits = function() {
  var units = _.map(this.units, function(unit) {
    return _.pick(unit, ['id', 'count']);
  });

  return RosterModel.$$resource.set(this.id, { units: units });
};

RosterModel.prototype.$suggest = function(unit) {
  if (_.contains(_.pluck(this.units, 'id'), unit.id)) return;

  unit.count = 1;
  this.suggestions.$addSuggestion(unit);
};

RosterModel.prototype.$acceptSuggestion = function(unit) {
  var self = this;

  return this.suggestions.$removeSuggestion(unit).then(function() {
     return self.$add(unit);
  });
};

RosterModel.prototype.$declineSuggestion = function(unit) {
  return this.suggestions.$removeSuggestion(unit);
};

})();
