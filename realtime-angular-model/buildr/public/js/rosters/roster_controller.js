/* global angular */

(function() {

'use strict';

angular
.module('Buildr')
.controller('RosterCtrl', ['$scope', 'rosterFactory', function($scope, rosterFactory) {
  var roster_id = '8dc743a3af53d898';

  rosterFactory
    .get(roster_id)
    .then(function(roster) {
      $scope.roster = roster;

      console.log($scope.roster);
    }).finally($scope.$apply.bind($scope));

  $scope.remove = function(roster) {
    roster.$remove();
  };
}]);

})();

