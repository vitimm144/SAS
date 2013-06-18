'use strict';

angular.module('authApp')
  .filter('timeAgo', function() {
  return function(timestamp) {
    // API should return time in seconds (not milliseconds)
    return moment(timestamp * 1000).fromNow();
  };
})

.filter('historyActions', function() {
  return function(input, actions) {
    if(input){
      var out = [];
      for (var i = 0; i < input.length; i++){
        if(actions[input[i].action]){
          out.push(input[i]);
        }
      }      
      return out;
    } else {
      return input;
    }
  };
});
