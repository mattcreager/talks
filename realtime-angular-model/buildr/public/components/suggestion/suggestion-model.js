/* global angular*/

(function() { 'use strict';

angular.module('Buildr').factory('bdSuggestions', function($goKey) {
  return $goKey('/suggestions');
});

})();