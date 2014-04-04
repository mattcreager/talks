/* global angular, EventEmitter, _ */

(function() { 'use strict';

// angular
// .module('Buildr')
// .factory('unitFactory', ['unitService', function(unitService) {
//   return {
//     get: function(id) {
//       return unitService.get(id).then(function(units) {
//         if (!_.isArray(units)) {
//           return new UnitModel(unitService, units);
//         }

//         return _.map(units, function(unit) {
//           return new UnitModel(unitService, unit);
//         });
//       });
//     }
//   };
// }]);

angular.module('Buildr').factory('UnitModel', function($http) {
  UnitModel._resource = new Resource($http);

  return UnitModel;
});

function Resource(http) {
  _.extend(this, {
    _http: http,
    _path: '/units'
  });

  _.bindAll(this, 'find');
}

Resource.prototype.find = function(uid) {
  var deferred = Q.defer();
  var path = uid ? this._path + '/' + uid : this._path;

  this._http
    .get(path)
    .success(deferred.resolve)
    .error(deferred.reject);

  return deferred.promise;
};

function UnitModel(unitData) {
  _.extend(this, {
    packagedData: unitData,
    value: null
  });
}

UnitModel.find = function(uid) {
  return new this(this._resource.find());
};

UnitModel.prototype.$$emitter = _.clone(EventEmitter.prototype);

UnitModel.prototype.$remove = function() {
  console.log('remove me what?');
};

})();
















// function inheritPrototype(SubClass, SuperClass) {
//   var superCopy = Object.create(SuperClass.prototype);
//   superCopy.constructor = SubClass;

//   SubClass.prototype = superCopy;
// }

