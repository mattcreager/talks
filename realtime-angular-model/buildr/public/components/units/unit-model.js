/* global angular, EventEmitter, _ */

(function() { 'use strict';

function UnitModel(futureUnitData) {
  if (!futureUnitData.inspect) {
    _.extend(this, futureUnitData);
    return;
  }

  this.$futureUnitData = futureUnitData;
  this.$unwrap(futureUnitData);
}

UnitModel.$factory = ['$timeout', 'bdResource', function($timeout, Resource) {
  _.extend(UnitModel, {
    $$resource: new Resource('/units'),
    $timeout: $timeout
  });

  return UnitModel;
}];

UnitModel.$find = function(uid) {
  var futureUnitData = this.$$resource.find(uid);

  if (uid) return new UnitModel(futureUnitData);

  return UnitModel.$unwrapCollection(futureUnitData);
};

UnitModel.$unwrapCollection = function(futureUnitData) {
  var collection = {};

  collection.$futureUnitData = futureUnitData;

  futureUnitData.then(function(units) {
    UnitModel.$timeout(function() {
      _.reduce(units, function(c, unit) {
        c[unit.id] = new UnitModel(unit);
        return c;
      }, collection);
    });
  });

  return collection;
};

UnitModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

UnitModel.prototype.$unwrap = function() {
  var self = this;

  this.$futureUnitData.then(function(data) {
    UnitModel.$timeout(function() { _.extend(self, data); });
  });
};

angular.module('Buildr').factory('UnitModel', UnitModel.$factory);

})();
