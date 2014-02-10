/* global angular, EventEmitter, _ */

(function() { 'use strict';

angular
.module('Buildr')
.factory('unitFactory', ['unitService', function(unitService) {
  return {
    get: function(id) {
      return unitService.get(id).then(function(units) {
        units = _.isArray(units) ? units : [units];

        return _.map(units, function(unit) {
          return new UnitModel(unitService, unit);
        });
      });
    }
  };
}]);

function UnitModel(unitService, unit) {
  _.extend(this, {
    $$service: unitService,
    $id: unit.id
  });

  _.merge(this, unit);
}

UnitModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

UnitModel.prototype.$get = function() {
  return this.$$service.get();
};

UnitModel.prototype.$remove = function() {
  console.log('remove me what?')
}

})();