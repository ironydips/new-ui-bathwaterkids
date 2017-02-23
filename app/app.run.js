'use strict';

angular.
  module('bathwaterApp').
  run(['GAuth','$http','$rootScope','$state', function(GAuth, $http, $rootScope, $state){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.$state = toState.name;
    });
    
    $state.go('gSignIn');
    
  }]);