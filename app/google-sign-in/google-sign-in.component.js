'use strict';

function GoogleSignInController($state,$interval,$http, GAuth){

this.login = function(){
	var CLIENT = angular.config.clientID;
    GAuth.setClient(CLIENT);

    var intervalId = $interval(function(){
	    GAuth.checkAuth().then(
	            function (profile) {
	            	$interval.cancel(intervalId);
	            	var params = JSON.stringify({
			                        email: profile.email,
			                        name: profile.name	
		                    	});

                    var url = "/rest/admin/gloginsuccess?email="+profile.email+"&id="+profile.id;                                   
	                
                    $http.get(url)
		                .then(function (data) {
	                        if (data.data.message == 'Success') {
	                            var key = data.data.key;
	                            $state.go('manageAdmin',{'profile': angular.toJson(profile), 'key': key });
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