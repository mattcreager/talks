/* global angular */

(function() { 'use strict';

angular.module('Buildr', ['truncate', 'goangular']).config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/mattcreager/buildr');
});

})();