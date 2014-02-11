/* global angular */

(function() {

'use strict';

angular
.module('Buildr')
.controller('UnitCtrl', ['$scope', 'unitFactory', function($scope, unitFactory) {
  unitFactory.get().then(function(units) {
    $scope.units = units;

    console.log($scope.units);
  }).finally($scope.$apply.bind($scope));

  $scope.remove = function(unit) {
    unit.$remove();
  };
}]);

})();
