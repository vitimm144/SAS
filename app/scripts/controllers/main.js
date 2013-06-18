'use strict';

angular.module('authApp')
  .controller('MainCtrl', function (errorService,$scope, $location, $http, Restangular) {
    $scope.$on('event:loginRequired', function() {
      $location.path('/login');
    });
    
    
//    var v;
//    var rest = Restangular.all('grupos');
//    $scope.grupos = rest.getList();
//    $scope.set = function(){
//      var a = Restangular.one('grupos', 3).one('campanhas', 15).interromper()
//        .then(function (){
//          console.log('interrompido');
//        });
//    };
    $scope.resposta = function(){
       $http.get('api/comando').success(function(data){
        console.log(JSON.decode(data));
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
