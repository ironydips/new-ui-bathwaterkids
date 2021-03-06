'use strict';

function GoogleSignInController($state, $interval,$cookies, GAuth, AdminManagerService, AdminRightsService) {

    var ctrl = this;
    ctrl.isSuperAdmin = false;
    ctrl.profile = {};
    var rights = {
        Admin: false,
        Pickup: false,
        Customers: false,
        Inventory: false,
        Warehouse: false
    };


    ctrl.init = function() {
        ctrl.login();
    };

    ctrl.login = function() {
        var CLIENT = angular.config.clientID;
        GAuth.setClient(CLIENT);
        GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');

        // load the auth api so that it doesn't have to be loaded asynchronously
        // when the user clicks the 'login' button.
        // That would lead to popup blockers blocking the auth window
        GAuth.load();

        // window.gapi.client.oauth2.userinfo.get().execute(function (profile) {
        //     ctrl.loginAdmin(profile);
        //  });

        var intervalId = $interval(function() {
            window.gapi.client.oauth2.userinfo.get().execute(function(profile) {
                if (profile && profile.result) {
                    $interval.cancel(intervalId);
                    ctrl.loginAdmin(profile.result);
                }
            });
            console && console.clear ? console.clear() : null;
        }, 1000);
        // var CLIENT = angular.config.clientID;
        //    GAuth.setClient(CLIENT);

        //    var intervalId = $interval(function(){
        //     GAuth.checkAuth().then(
        //             function (profile) {
        //              $interval.cancel(intervalId);
        //                       ctrl.loginAdmin(profile);
        //         });
        //      console && console.clear ? console.clear() : null;
        //  },1000);
    };

    ctrl.loginAdmin = function(profile) {

        ctrl.profile = profile;

        AdminManagerService.loginAdmin(ctrl.profile.email, ctrl.profile.id)
            .then(function(response) {
                if (response && response.data) {
                    ctrl.profile.role = response.data.role;
                    ctrl.profile.key = response.data.key;
                    $cookies.put('token', ctrl.profile.key);
                    switch (profile.role) {
                        case "0":
                            rights.Pickup = true;
                            ctrl.AssignAdmin();
                            break;
                        case "1":
                            rights.Customers = true;
                            ctrl.AssignAdmin();
                            break;
                        case "2":
                            rights.Inventory = true;
                            ctrl.AssignAdmin();
                            break;
                        case "3":
                            rights.Warehouse = true;
                            ctrl.AssignAdmin();
                            break;
                        case "4":
                            rights.Admin = true;
                            ctrl.AssignAdmin();
                            break;
                        case "10":
                            ctrl.AssignSuperadmin();
                            break;
                    }
                }
            })
            .catch(function(err) {
                console.log('Error logging as Admin');
                console.log(err);
            });
    };


    ctrl.AssignSuperadmin = function() {
        ctrl.isSuperAdmin = true;
        rights.Customers = true;
        rights.Inventory = true;
        rights.Warehouse = true;
        rights.Admin = true;
        AdminRightsService.saveProfile(ctrl.profile);
        AdminRightsService.addRights(rights);
        $state.go('manageAdmin');
    };

    ctrl.AssignAdmin = function() {
        AdminRightsService.saveProfile(ctrl.profile);
        AdminRightsService.addRights(rights);
        $state.go('index');
    };
    ctrl.init();

}

angular.module('googleSignIn')
    .component('gSign', {
        templateUrl: 'google-sign-in/google-sign-in.template.html',
        controller: ['$state', '$interval','$cookies', 'GAuth', 'AdminManagerService', 'AdminRightsService', GoogleSignInController]
    });
