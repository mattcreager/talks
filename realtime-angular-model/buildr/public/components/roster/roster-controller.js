/* global angular */

var ROSTER_ID =  'dbc93961dff2a934';

(function() { 'use strict';

angular
.module('Buildr')
.controller('RosterCtrl', ['$scope', 'bdRoster', function($scope, Roster) {
  $scope.roster = Roster.$find(ROSTER_ID);
  $scope.roster.$getUnits();
}]);

})();

