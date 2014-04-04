/* global angular, Q, _, dpd */

(function() { 'use strict';

angular
.module('Buildr')
.factory('rosterService', ['$http', function($http) {
  // return new RosterService($http);
}]);

function RosterService($http) {
  // _.extend(this, {
  //   $$http: $http,
  //   $$path: '/rosters'
  // });
}

RosterService.prototype.get = function(id) {
  // var self = this;
  // var deferred = Q.defer();
  // var path = id ? this.$$path + '/' + id : this.$$path;

  // this.$$http
  //   .get(path)
  //   .success(function(result) {
  //     var units = _.map(result.units, function(unit) {
  //       return self.$$unitFactory.get(unit.unit_id).then(function(unitModel) {
  //         return _.merge(unitModel, unit);
  //       });
  //     });

  //     Q.all(units).then(function(units) {
  //       result.units = units;

  //       deferred.resolve(result);
  //     });
  //   })
  //   .error(deferred.reject);

  // return deferred.promise;
};

RosterService.prototype.addUnit = function(id, unitData) {
  // var deferred = Q.defer();

  // dpd.rosters.put(id, {
  //    units: { $push: unitData }
  // }, function(result, err) {
  //   if (!result) return deferred.reject(err);

  //   deferred.resolve(result);
  // });

  // return deferred.promise;
};

RosterService.prototype.removeUnit = function(id, units) {
  // var deferred = Q.defer();

  // dpd.rosters.put(id, { units: units }, function(result, err) {
  //   if (err) return deferred.reject(err);

  //   deferred.resolve(result);
  // });

  // return deferred.promise;
};

RosterService.prototype.inc = function(id, unitId) {
  // dpd.rosters.put(id, { 'units.unit_id': unitId }, { $inc: { count: 1 } }, function(result, err) {
  //   console.log(result, err);
  // });
};

})();
