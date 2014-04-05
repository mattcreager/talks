/* global angular */

(function() {

'use strict';

angular
.module('Buildr')
.controller('RosterCtrl', ['$scope', 'RosterModel', function($scope, Roster) {

  var roster_id = '8dc743a3af53d898';

  $scope.roster = Roster.$find(roster_id);
  $scope.roster.$getUnits();

  console.log($scope.roster);

  // $scope.remove = function(roster) {
  //   roster.$remove();
  // };
}]);

})();

