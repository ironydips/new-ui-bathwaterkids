'use strict';

function GoogleSignInController($state,$interval,$http, GAuth, AdminManagerService, AdminRightsService){

	var ctrl = this;

	ctrl.init = function(){
		ctrl.login();
	}

	ctrl.login = function(){
		var CLIENT = angular.config.clientID;
	    GAuth.setClient(CLIENT);

	    var intervalId = $interval(function(){
		    GAuth.checkAuth().then(
		            function (profile) {
		            	$interval.cancel(intervalId);

		            	    ctrl.isSuperAdmin = false;
				            var rights = {
				                Admin: false,
				                Pickup: false,
				                Customers: false,
				                Inventory: false,
				                Warehouse: false
				            };

            AdminManagerService.loginAdmin(profile.email, profile.id)
                .then(function(response) {
                    if (response && response.data) {
                        profile.role = response.data.role;
                        profile.key = response.data.key;

                        switch(profile.role){
                            case "0":
                                rights.Pickup = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "1":
                                rights.Customers = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "2":
                                rights.Inventory = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "3":
                                rights.Warehouse = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "4":
                                rights.Admin = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "10":
                                ctrl.isSuperAdmin = true;
                                rights.Customers = true;
                                rights.Inventory = true;
                                rights.Warehouse = true;
                                rights.Admin = true;
                                AdminRightsService.saveProfile(profile);
                                AdminRightsService.addRights(rights);
                                $state.go('manageAdmin');
                                break;
                        }
                    }
                })
                .catch(function(err) {
                    console.log('Error logging as Admin');
                    console.log(err);
                })
	         });
		    	console && console.clear ? console.clear() : null;
			},1000);
		}

	ctrl.init();
}

angular.module('googleSignIn')
.component('gSign',{
	templateUrl: 'google-sign-in/google-sign-in.template.html',
	controller: ['$state','$interval','$http','GAuth','AdminManagerService','AdminRightsService', GoogleSignInController]
});