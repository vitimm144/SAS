'use strict';

angular.module('authApp', ['restangular', 'ui.unique'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
angular.module('authApp').config(function($httpProvider) {
      $httpProvider.responseInterceptors.push('errorHttpInterceptor');
});
angular.module('authApp').config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
    
  RestangularProvider.setOnElemRestangularized(function(elem, isCollection, route) {
    
    //if (!isCollection && route === "grupos") {
        // This will add a method called evaluate that will do a get to path evaluate with NO default
        // query params and with some default header
        // signature is (name, operation, path, params, headers, elementToPost)
        //elem.addRestangularMethod('interromper', 'get', 'interromper', {'id':'value'},undefined );
        elem.addRestangularMethod('interromper', 'get', 'interromper');
    //};
    
    return elem;
  });
});

