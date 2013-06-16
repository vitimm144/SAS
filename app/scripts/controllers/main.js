'use strict';

angular.module('TrabsasApp')
  .controller('MainCtrl', function ($scope, $http, $window) {
    $scope.usuario = {"login":"", "senha":"" };

    $scope.enviar = function(){
      console.log("entrou em enviar");
      $http.post("/login", $scope.usuario)
        .success(function(){
          $window.alert("OK");
          console.log("OK");
        })
        .error(function(){
          $window.alert("error");
        });
      
   }

});