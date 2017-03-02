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

		var getUserInventory = function(userID){
			return $http({
		            url: '/rest/getUserInventory?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var getUserRequest = function(userID){
			return $http({
		            url: '/rest//getUserRequests?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};
		var getInventory = function(userID){
			return $http({
		            url: '/rest/getItems?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};
		

		//EXPORTED Object
		return {
			getUsers,
			getUserInventory,
			getUserRequest,
			getInventory
		}
	}

	angular.module('bathwaterApp.services')
		.factory('customerUserService',['$http',CustomerUserServiceHandler]);	

})(window.angular);