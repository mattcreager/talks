/* global angular */

(function() { 'use strict';

angular
.module('Buildr')
.controller('UnitCtrl', [
  '$scope',
  'UnitModel',
  function($scope, Unit) {

    var blahUnit = Unit.find();

    console.log('in bis', blahUnit);
  }]);

})();


/***

unitFactory.get().then(function(units) {
      $scope.units = units;

      console.log($scope.units);
    }).finally($scope.$apply.bind($scope));

    $scope.remove = function(unit) {
      unit.$remove();
    };

***/
