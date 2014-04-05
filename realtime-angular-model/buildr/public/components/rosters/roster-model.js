/* global angular, EventEmitter, _, Q */

(function() { 'use strict';

function RosterModel(futureRosterData) {
  if (!futureRosterData.inspect) {
    _.extend(this, futureRosterData);
    return;
  }

  this.$futureRosterData = futureRosterData;
  this.$unwrap(futureRosterData);
}

RosterModel.$factory = ['$timeout', 'bdResource', 'UnitModel', function($timeout, Resource, Unit) {
  _.extend(RosterModel, {
    $$resource: new Resource('/rosters'),
    $timeout: $timeout,
    $Unit: Unit
  });

  return RosterModel;
}];

RosterModel.$find = function(uid) {
  var futureRosterData = this.$$resource.find(uid);

  if (uid) return new RosterModel(futureRosterData);

  return RosterModel.$unwrapCollection(futureRosterData);
};

RosterModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

RosterModel.prototype.$getUnits = function() {
  var self = this;

  return this.$futureRosterData.get('units').then(function(rosterUnits) {
    var units  = _.reduce(rosterUnits, function(a, rosterUnit) {
      var unit = RosterModel.$Unit.$find(rosterUnit.unit_id);
      _.extend(unit, rosterUnit);
      a.push(unit);
      return a;
    }, []);

    RosterModel.$timeout(function() {
      self.units = units;
    });

    return Q.all(_.pluck(units, '$futureUnitData')).then(function() {
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
    return {
      unit_id: unit.id,
      count: unit.count || 1
    };
  });

  return RosterModel.$$resource.set(this.id, { units: units });
};

angular.module('Buildr').factory('RosterModel', RosterModel.$factory);

})();
