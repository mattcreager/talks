/* global angular */

(function() { 'use strict';

angular
.module('Buildr')
.controller('UnitCtrl', ['$scope', 'bdUnit', function($scope, Unit) {
    $scope.units = Unit.$find();
    console.log($scope.units);
}]);

})();
