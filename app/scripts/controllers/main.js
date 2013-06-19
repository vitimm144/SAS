'use strict';

angular.module('authApp')
  .controller('MainCtrl', function (errorService,$scope, $location, $http, Restangular) {
    $scope.$on('event:loginRequired', function() {
      $location.path('/login');
    });
    
    $scope.resposta = function(){
       $http.get('api/who').success(function(data){
        $scope.who = data;
      });
       $http.get('api/history').success(function(data){
        $scope.history = data;
      });
    };
    $scope.sair = function(){
      $http.get('api/logout').success(function(){
        $location.path('/login');
      }).error(function(){
        $scope.errorService = errorService;
      });
    };
  });
