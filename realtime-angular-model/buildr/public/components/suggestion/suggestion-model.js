/* global angular*/

(function() { 'use strict';

angular.module('Buildr').factory('bdSuggestions', function($goKey) {
  var suggestions = $goKey('suggestion/');

  suggestions.$removeSuggestion = function(unit) {
    return this.$key(unit.id).$remove();
  };

  suggestions.$addSuggestion = function(unit) {
    return this.$key(unit.id).$set(unit.$omit());
  };

  return suggestions;
});

})();