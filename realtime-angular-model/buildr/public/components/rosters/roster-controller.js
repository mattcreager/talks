/* global angular */

(function() {

'use strict';

angular
.module('Buildr')
.controller('RosterCtrl', ['$scope', 'UnitModel', function($scope, Unit) {

  //console.log(Unit);

  // var roster_id = '8dc743a3af53d898';

  // rosterFactory
  //   .get(roster_id)
  //   .then(function(roster) {
  //     $scope.roster = roster;

  //     console.log($scope.roster);
  //   }).finally($scope.$apply.bind($scope));

  // $scope.remove = function(roster) {
  //   roster.$remove();
  // };
}]);

})();

