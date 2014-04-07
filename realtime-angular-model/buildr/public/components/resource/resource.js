/* global angular, _, Q */

(function() { 'use strict';

/** Constructor  **/

/* Factory */

/* Registration */

/* Record retrieval */

Resource.prototype.path = function(uid) {
  return uid ? this._path + '/' + uid : this._path;
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
