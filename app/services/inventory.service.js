(function(angular) {
	"use strict";
	
	function InventoryServiceHandler($http){

		
		var getInventory = function(){
			return $http({
		            url: '/rest/admin/getBWItems',
		            method: "GET",
		            headers:{
	            		"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};
		

		//EXPORTED Object
		return {
			getInventory
		}
	}

	angular.module('bathwaterApp.services')
		.factory('inventoryService',['$http',InventoryServiceHandler]);	

})(window.angular);