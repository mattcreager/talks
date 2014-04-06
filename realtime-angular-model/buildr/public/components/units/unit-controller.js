/* global angular */

(function() { 'use strict';

angular
.module('Buildr')
.controller('UnitCtrl', [
  '$scope',
  'UnitModel',
  function($scope, Unit) {

    //$scope.blahUnit = Unit.$find('4826f1ef3d292b6f');
    $scope.units = Unit.$find();

    //console.log($scope.units, $scope.blahUnit)

    // $scope.$watch('blahUnit', function() {
    //   console.log(arguments)
    // })
  }]);

})();
