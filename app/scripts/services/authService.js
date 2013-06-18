'use strict';

angular.module('authApp')
  .factory('errorService', function() {
    return {
      errorMessage: null,
      setError: function(msg) {
        this.errorMessage = msg;
      },
      clear: function() {
        this.errorMessage = null;
      }
    };
});
angular.module('authApp').factory('errorHttpInterceptor',
      function($q, $location, errorService, $rootScope) {
        return function(promise) {
          return promise.then(function(response) {
            return response;
          }, function(response) {
              if (response.status === 401) {
                $rootScope.$broadcast('event:loginRequired');
              } else if (response.status >= 400 && response.status < 500) {
                errorService.setError('Server was unable to find' +
                      ' what you were looking for... Sorry!!');
              }
            return $q.reject(response);
            });
        };
 }); 
 angular.module('authApp').factory('authHttp', function($http, Authentication) {
        console.log(Authentication);
        var authHttp = {};
        // Append the right header to the request
        var extendHeaders = function(config) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = Authentication.getTokenType() +
          ' ' + Authentication.getAccessToken();
        };
        // Do this for each $http call
        angular.forEach(['get', 'delete', 'head', 'jsonp'], function(name) {
          authHttp[name] = function(url, config) {
          config = config || {};
          extendHeaders(config);
          return $http[name](url, config);
        };
        });
        angular.forEach(['post', 'put'], function(name) {
        authHttp[name] = function(url, data, config) {
          config = config || {};
          extendHeaders(config);
          return $http[name](url, data, config);
        };
        });
        return authHttp;
      });
