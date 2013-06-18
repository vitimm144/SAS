'use strict';

angular.module('authApp')
  .controller('LoginCtrl', function ($scope, $http, $location, errorService) {
    $scope.usuario = {login:"", senha:""};
    $scope.enviar = function(){
      $http.post('api/login', $scope.usuario).success(function(data){
        $location.path('/');
      }).error(function(){
         $scope.errorService = errorService;
      });
      
    };
    
  });
