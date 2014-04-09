/* global angular, EventEmitter, _ */

(function() { 'use strict';

/* CONSTRUCTOR ACCEPTS PROMISE OR DATA */
function Unit(futureUnitData) {

  /* DATA IS IMMEDIATELY AVAILABLE */
  if (!futureUnitData.inspect) {
    _.extend(this, futureUnitData);
    return;
  }

  /* THE PROMISE WILL BE UNWRAPPED FIRST */
  this.$unwrap(futureUnitData);
}

/* THE FACTORY WE'LL USE TO REGISTER WITH ANGULAR */
Unit.$factory = ['$timeout', 'bdResource', function($timeout, Resource) {
  _.extend(Unit, {
    $$resource: new Resource('/units'),
    $timeout: $timeout
  });

  return Unit;
}];

/* ANGULAR MODULE REGISTRATION */
angular.module('Buildr').factory('bdUnit', Unit.$factory);

/* FETCH A UNIT */
Unit.$find = function(uid) {

  /* FALLS BACK ON AN INSTANCE OF RESOURCE */
  var futureUnitData = this.$$resource.find(uid);

  if (uid) return new Unit(futureUnitData);

  return Unit.$unwrapCollection(futureUnitData);
};

Unit.prototype.$unwrap = function(futureUnitData) {
  var self = this;

  this.$futureUnitData = futureUnitData;
  this.$futureUnitData.then(function(data) {
    Unit.$timeout(function() { _.extend(self, data); });
  });
};

Unit.$unwrapCollection = function(futureUnitData) {
  var collection = {};

  collection.$futureUnitData = futureUnitData;

  futureUnitData.then(function(units) {
    Unit.$timeout(function() {
      _.reduce(units, function(c, unit) {
        c[unit.id] = new Unit(unit);
        return c;
      }, collection);
    });
  });

  return collection;
};

Unit.prototype.$omit = function() {
  return _.omit(this, function(value, key){
    return _.first(key) === '$' || key === 'constructor';
  });
};

})();
