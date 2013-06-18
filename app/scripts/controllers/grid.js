'use strict';

angular.module('authApp')
  .controller('GridCtrl', function ($scope, $http, $location) {
  $scope.$on('event:loginRequired', function() {
      $location.path('/login');
    });
  // Two models for this controller, one for the user, and one for available actions, 
  // generated from what the user actually did (versus a static list of actions 
  // we need to keep up to date)
  $scope.user = {};
  $scope.actions = {};
  // This can be read as "get me data from the 'User' controller from the 
  // 'all' method, based on the id in the apps URL"
  //$http.get($rootScope.uiPrefix + 'User/all/' + $routeParams.id).success(function(data) {
  $http.get('api/90').success(function(data) {
    $scope.user.info = data.results.info;
    $scope.user.history = data.results.history;
    // Iterate through a list of unique actions from the user history and set
    // defaults for all actions to be 'true' except for the 'navigated' action 
    // which gets pretty noisey
    _.each(_.uniq(_.pluck(data.results.history, 'action')), function(a){
      $scope.actions[a] = a === 'navigated' ? false : true; 
    });
  });
  /*array q armazena os itens selecionados pelo usuários, para utilizar no serviço 
   * do restangular, precisa tratar em relação aos filtros da página para que por 
   * acidente, o usuario selecione varios depois use o filtro e pense estar excluindo 
   * 1 por exemplo, mas antes ele havia selecionado varios */ 
  $scope.selecionados = [];
  //funcão para verificar se existe um item específico no array 
  $scope.noarray = function(item){
    return _.find($scope.selecionados, item);
  };
  $scope.selecionar = function(item, $event, indAtual){
    //verificar se tecla shift estava pressionada ao clicar no item do grid
    if($event.shiftKey){
      /* variavel para armazenar o indice do ultimo elemento selecionado no array
       * user.history para poder selecionar então os elementos posteriores
       * ou anteriores 
       * */
      var indAnterior =  _.indexOf($scope.user.history, 
        $scope.selecionados[$scope.selecionados.length - 1]);

      if( ! _.find($scope.selecionados, item)){
        //regra para selecionar elementos posteriores 
        if(indAtual > indAnterior){
          for (var i = indAnterior + 1; i <= indAtual; i ++){
            $scope.selecionados.push($scope.user.history[i]);
          }
        //regra para selecionar elementos anteriores  
        }else if(indAtual < indAnterior){
          for (var i = indAtual; i <= indAnterior -1; i ++){
            $scope.selecionados.push($scope.user.history[i]);
          }
        //caso o usuario dê dois cliques consecutivos
        // com a tecla shift apertada no elemento atual, excluí-lo.
          }else{
            $scope.selecionados.splice(_.indexOf($scope.selecionados, item),1);
          }
      }else{
        $scope.selecionados.splice(_.indexOf($scope.selecionados, item),1);
      }
    }else{
      //verificar se o item existe no array, caso exista excluí-lo se não, adicioná-lo 
      if( ! _.find($scope.selecionados, item)){
        $scope.selecionados.push(item);
      }else{
        $scope.selecionados.splice(_.indexOf($scope.selecionados, item),1);
      }
    }
  };

  $scope.toggleSelecionarTodos = function(){
    if($scope.selecionados.length !== 0){
      $scope.selecionados = [];
    }else{
      $scope.selecionados = _.union($scope.user.history,$scope.selecionados);
    }
  };
});