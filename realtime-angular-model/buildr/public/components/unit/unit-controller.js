/* global angular */

(function() { 'use strict';

angular
.module('Buildr')
.controller('UnitCtrl', [
  '$scope',
  'UnitModel',
  function($scope, Unit) {
    $scope.units = Unit.$find();
  }]);
})();
