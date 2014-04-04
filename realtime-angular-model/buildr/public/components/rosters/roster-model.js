/* global angular, EventEmitter, _ */

(function() { 'use strict';

angular
.module('Buildr')
.factory('rosterFactory', ['$timeout', 'rosterService', function($timeout, rosterService) {
  return {
    get: function(id) {
      return rosterService.get(id).then(function(rosters) {
        if (!_.isArray(rosters)) {
          return new RosterModel($timeout, rosterService, rosters);
        }

        return _.map(rosters, function(roster) {
          return new RosterModel($timeout, rosterService, roster);
        });
      });
    }
  };
}]);

function RosterModel($timeout, rosterService, roster) {
  _.extend(this, {
    $$service: rosterService,
    $$timeout: $timeout
  });

  _.merge(this, roster);
}

RosterModel.prototype.$inc = function(unit) {
  var self = this;

  this.$$timeout(function() {
    unit.count++;
  });

  return this.$$service.inc(this.id, unit.id);
};

RosterModel.prototype.$add = function(unit) {
  var self = this;

  if (_.find(this.units, { id: unit.id })) {
    return this.$inc(unit);
  }

  this.$$timeout(function() {
    self.units.push(unit);
  });

  return this.$$service.addUnit(this.id, {
    unit_id: unit.id,
    count: 1
  });
};

RosterModel.prototype.$remove = function(unit) {
  this.units.splice(this.units.indexOf(unit), 1);

  var units = _.map(this.units, function(unit) {
    return {
      unit_id: unit.id,
      count: unit.count
    };
  });

  return this.$$service.removeUnit(this.id, units);
};

RosterModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

})();
