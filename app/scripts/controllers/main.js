'use strict';

angular.module('authApp')
  .controller('MainCtrl', function (errorService,$scope, $location, $http, Restangular) {
    $scope.$on('event:loginRequired', function() {
      $location.path('/login');
    });
    $scope.reqUser = function(){
      $http.get('api/usuarios').success(function(data){
          $scope.usuarios = data.split('\\');
          //$scope.usuarios;
          //console.log($scope.usuarios[0]);
      });  
    };
    $scope.reqUser();
    $scope.resposta = function(){
       $http.get('api/who').success(function(data){
        $scope.who = data;
      });
       $http.get('api/history').success(function(data){
       // console.log(data);
        $scope.history = data.split('\\');
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
