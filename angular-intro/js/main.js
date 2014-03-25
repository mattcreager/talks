/* jshint browser:true */
/* global angular, Reveal */

'use strict';

angular
  .module('AngularIntro', [])
  .controller('SectionTitleCtrl', ['$scope', function($scope) {
    $scope.section = {}

    $scope.$watch(function() {
      return Reveal.getCurrentSlide().getAttribute('data-title');
    }, function(newVal, oldVal) {
      $scope.section.title = newVal;
    });

    Reveal.addEventListener('slidechanged', $scope.$apply.bind($scope));

    // function updateTitle() {
    //   var title = Reveal.getCurrentSlide().getAttribute('data-title');
    //   console.log(title);
    //   $scope.$apply(function() {
    //     $scope.section.title = title;
    //   });
    // }
  }]);