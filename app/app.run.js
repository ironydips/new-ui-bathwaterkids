'use strict';

angular.
  module('bathwaterApp').
  run(['GAuth','$http','$rootScope','$state', function(GAuth, $http, $rootScope, $state){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      $rootScope.$state = toState.name;
    });

    var CLIENT = angular.config.clientID;
    GAuth.setClient(CLIENT);
    GAuth.load();

    // GAuth.checkAuth()
    // .then(function (profile) {
    //         var params = JSON.stringify({
    //                       email: profile.email,
    //                       name: profile.name  
    //                   });

    //         var url = "/rest/admin/gloginsuccess?email="+profile.email+"&id="+profile.id;                                   
                  
    //         $http.get(url)
    //         .then(function (data) {
    //               if (data.data.message == 'Success') {
    //                   var key = data.data.key;
    //                   $state.go('manageAdmin',{'profile': angular.toJson(profile), 'key': key });
    //               }
    //           })
    //           .catch(function(err){
    //             console.log('Error on Oauth Login!!' + err);
    //           })
    //     },
    //     function(error){
    //       $state.go('gSignIn');
    //     })
    // .catch(function(err){
    //         $state.go('gSignIn');
    //         console.log('Error on checkAuth Login!!' + err);
    //       });
  }]);