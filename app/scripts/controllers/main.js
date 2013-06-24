'use strict';

angular.module('authApp')
  .controller('MainCtrl', function (errorService,$scope, $location, $http, Restangular) {
    $scope.$on('event:loginRequired', function() {
      $location.path('/login');
    });
    $scope.$watch('usuario', function(){
        console.log($scope.usuario);
       if($scope.usuario)
        $scope.getHistory();
    });
    $scope.reqUser = function(){
      $http.get('api/usuarios').success(function(data){
          $scope.usuarios = [];
          var aux = [];
          var padrao = /bash\b/;
          var regex = new RegExp(padrao); 
          //console.log(regex);
          for (var i = 0; i< data.length; i++){
           //console.log(regex.test(data[i]));
              if(regex.test(data[i])){
                  aux.push(data[i].split(':'));
                  //$scope.usuarios.push(aux[i].0);
//                  console.log(aux);
              }
              
          }
          
          for(var j = 0; j<aux.length;j++){
              //console.log(aux[j][0]);
              $scope.usuarios.push(aux[j][0]);
          }
          
          //$scope.usuarios = data.split('sh');
          //$scope.usuarios = data;
          console.log($scope.usuarios);
      });  
    };
    $scope.reqUser();
    $scope.getHistory = function(){
       
       $http.get('api/history/'+ $scope.usuario).success(function(data){
       // console.log(data);
        $scope.history = data.split('\\');
      });
    };
    $scope.getUserOnline = function(){
        $http.get('api/who').success(function(data){
        $scope.who = data;
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
