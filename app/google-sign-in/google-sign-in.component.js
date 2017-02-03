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

	                $http.post("https://staging.bathwaterkids.com/rest/oauth/login",params)
	                .then(function (data) {
                        if (data.data.message === 'success') {
                            $state.go('index');
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