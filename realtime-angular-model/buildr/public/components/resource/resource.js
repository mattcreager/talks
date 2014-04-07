/* global angular, _, Q */

(function() { 'use strict';

function Resource($http, path) {
  _.extend(this, {
    _http: $http,
    _path: path
  });
}

Resource.factory = function($http) {
  return function(path) {
    return new Resource($http, path);
  };
};

angular.module('Buildr').factory('bdResource', Resource.factory);

Resource.prototype.find = function(uid) {
  var deferred = Q.defer();

  var path = uid ? this._path + '/' + uid : this._path;

  this._http
    .get(path)
    .success(deferred.resolve)
    .error(deferred.reject);

  return deferred.promise;
};

Resource.prototype.set = function(uid, newValue) {
  var deferred = Q.defer();
  var path = this._path + '/' + uid;

  this._http
    .put(path, newValue)
    .success(deferred.resolve)
    .error(deferred.reject);

  return deferred.promise;
};

})();
