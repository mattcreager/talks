/* global angular, Q, _ */

(function() { 'use strict';

angular
.module('Buildr')
.factory('unitService', ['$http', function($http) {
  return new UnitService($http);
}]);

function UnitService($http) {
  _.extend(this, {
    $$http: $http,
    $$path: '/units'
  });
}

UnitService.prototype.get = function(id) {
  var deferred = Q.defer();
  var path = id ? this.$$path + '/' + id : this.$$path;

  this.$$http
    .get(path)
    .success(deferred.resolve)
    .error(deferred.reject);

  return deferred.promise;
};

})();