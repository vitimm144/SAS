'use strict';

angular.module('authApp')
 .directive('filterGrid', ['$http','$routeParams','$rootScope',function($http, $routeParams, $rootScope) {
  return {

    // Lets target this directive to be used as an element (<filter-grid></filter-grid>) 
    // This has legacy implications if you're supporting legacy browsers (< IE9) but we'll ignore them here
    restrict: 'E',

    // Get rid of the dom element and replace with whats in our template
    replace: true,

    // This function gets executed for each DOM element AngularJS finds
    link: function(scope, elem, attrs) {

      // Lets give the grid a title
      scope.title = attrs.title;
      scope[attrs.method] = [];
      scope.loaded = false;
      scope.actionsFilter = function() {
        return function(input) {
          if(input){
            if(scope.actions[input.action]){
                return input;
            }   
          } 
        };
      };
      // Grab some data passed in from attributes named 'controller' and 'method' to construct a url to call
      $http.get($rootScope.uiPrefix + attrs.controller +'/'+attrs.method+'/' + $routeParams.id).success(function(data) {
        // Rememeber that directives have their own scopes, so even though 'results' isn't a well named model, it will suffice
        // here because nothing else will share the scope.
        scope.results = data.results[attrs.property];

        // Get the unique list of actions
        _.each(_.uniq(_.pluck(scope.results, 'action')), function(a){
          scope.actions[a] = a == 'navigated' ? false : true; 
        });
        console.log(scope.actions)
        // Get a list of fields for headers
        console.log(data.results[attrs.property]);
        scope.fields = _.keys(scope.results[0]);
      });
    },
    template: '<div>' +
                // Set the title
                '<h3> {{title}} </h3>' +
                '<div class="row-fluid">' +
                  '<div class="span6">' +
                    '<div class="input-prepend">' +
                      '<span class="add-on">Filter:</span>' +
                      '<input type="text" placeholder="Type to filter by entity name" ng-model=entityNameFilter>' +
                    '</div>' +
                  '</div>' +
                  '<div class="span6">' +
                    // create check boxes for each of the actions in the dataset
                    // set the model for each to the 'actions' object in the scope holding the true/false values
                    '<label class="checkbox inline pull-right" ng-repeat="(name,value) in actions">' +
                      '<input type="checkbox" value="value" ng-model="actions[name]"> {{name}}' +
                    '</label>' +
                  '</div>' +
                '</div>' +
                '<table class="table table-hover table-bordered table-striped">' +
                  '<thead>' +
                  // list out the field names as table headers
                  '<td ng-repeat="field in fields">{{field}}</td>' +
                  '</thead>' +
                  '<tbody>' +
                    // loop through the rows from the AJAX callback
                    '<tr ng-repeat="row in results | filter:actionsFilter()| filter:entityNameFilter">' +
                      //print out the property corresponding to the field from each row
                      '<td ng-repeat="field in fields">{{row[field]}}</td>' +
                    '</tr>' +
                  '</tbody>' +
                '</table>' +
              '</div>'
    };
}]);