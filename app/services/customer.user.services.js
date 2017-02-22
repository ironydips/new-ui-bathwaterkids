(function(angular) {
	"use strict";
	
	function CustomerUserServiceHandler($http){

		var getUsers = function(){
			return $http({
		            url: '/rest/getUsers',
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		

		//EXPORTED Object
		return {
			getUsers
		}
	}

	angular.module('bathwaterApp.services')
		.factory('customerUserService',['$http',CustomerUserServiceHandler]);	

})(window.angular);