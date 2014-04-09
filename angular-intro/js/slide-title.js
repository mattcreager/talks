/* global angular, Reveal */

angular
  .module('AngularIntro', [])
  .controller('SectionTitleCtrl', function($scope) {
    'use strict';

    Reveal.addEventListener('ready', newSlide);
    Reveal.addEventListener('slidechanged', newSlide);

    function newSlide() {
      var title = Reveal.getCurrentSlide().getAttribute('data-title');

      $scope.$apply(function() {
        $scope.sectionTitle = title;
      });
    }
  });

