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

		var getUserItems  = function(userID){
			return $http({
		            url: '/rest/getUserItems?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var getUserRequest = function(userID){
			return $http({
		            url: '/rest/getUserRequests?userid='+ userID,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};
		var getTrucksByUserrequests = function(){
			return $http({
		            url: '/admin/getTrucksByUserrequests?date='+ "21/03/2017",
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};
		var getCategories = function(categories){
			return $http({
		            url: '/rest/getCategories?parentID='+ categories,
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4=',
	            		"Content-Type": "application/x-www-form-urlencoded"
	            }
	        });
		}
		

		//EXPORTED Object
		return {
			getUsers,
			getUserInventory,
			getUserItems,
			getUserRequest,
			getTrucksByUserrequests,
			getCategories
		}
	}

	angular.module('bathwaterApp.services')
		.factory('customerUserService',['$http',CustomerUserServiceHandler]);	

})(window.angular);