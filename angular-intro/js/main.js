/* jshint browser:true */
/* global angular, Reveal */

'use strict';

angular
  .module('AngularIntro', [])
  .controller('SectionTitleCtrl', ['$scope', function($scope) {
    $scope.section = {};

    Reveal.addEventListener('slidechanged', updateTitle);

    function updateTitle() {
      var title = Reveal.getCurrentSlide().getAttribute('data-title');

      $scope.$apply(function() {
        $scope.section.title = title;
      });
    }
  }]);