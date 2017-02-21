'use strict';

function GoogleSignInController($state,$interval,$http, GAuth){

this.login = function(){
	var CLIENT = '531188035829-e83na2d4nj50fu7baqc7q7mlqauboqvs.apps.googleusercontent.com';
    GAuth.setClient(CLIENT);

    var intervalId = $interval(function(){
	    GAuth.checkAuth().then(
	            function (profile) {
	            	$interval.cancel(intervalId);
	            	var params = JSON.stringify({
			                        email: profile.email,
			                        name: profile.name	
		                    	});

	                $http.get("/rest/admin/gloginsuccess?email="+profile.email+"&id="+profile.id)
	                .then(function (data) {
                        if (data.data.message == 'Success') {
                        	var key = data.data.key;
                           $state.go('manageAdmin',{'profile': angular.toJson(profile), 'key': key});
                        }
                    })
                    .catch(function(err){
                    	console.log('Error on Oauth Login!!' + err);
                    })
                });
	    	console && console.clear ? console.clear() : null;
		},2000);
	}
}

angular.module('googleSignIn')
.component('gSign',{
	templateUrl: 'google-sign-in/google-sign-in.template.html',
	controller: ['$state','$interval','$http','GAuth', GoogleSignInController]
});