/* global angular */

angular
  .module('Buildr', [
    'truncate',
    'goangular'
  ])
  .config(function($goConnectionProvider) {
    $goConnectionProvider.$set('https://goinstant.net/mattcreager/buildr');
  });
