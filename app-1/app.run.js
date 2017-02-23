'use strict';

angular.
  module('bathwaterApp').
  run(['GAuth','$http','$rootScope','$state', function(GAuth, $http, $rootScope, $state){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.$state = toState.name;
    });

    var CLIENT = '531188035829-e83na2d4nj50fu7baqc7q7mlqauboqvs.apps.googleusercontent.com';
    GAuth.setClient(CLIENT);
    GAuth.load();

          $state.go('gSignIn');
        
  }]);