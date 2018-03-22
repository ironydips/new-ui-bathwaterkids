(function(angular) {
	"use strict";
	
	function InventoryServiceHandler($http){

		
		var getInventory = function(status){
			return $http({
		            url: '/rest/getAllItems?status=' +status,
		            method: "GET",
		            headers:{
	            		//"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var updateInventory = function(storedItemID, newCredits, userRequestId){
			return $http({
		            url: '/rest/admin/updateCredits?storedID='+storedItemID  + '&newCredits=' + newCredits,
		            method: "GET",
		            headers:{
	            		//"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var updateItemStatus = function(storedItemID , status){
			return $http({
		            url: '/rest/admin/updateItemInWarehouse?storedItemID=' + storedItemID + '&status=' + status ,
		            method: "GET",
		            headers:{
	            		//"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		
		

		//EXPORTED Object
		return {
			getInventory,
			updateInventory,
			updateItemStatus
		}
	}

	angular.module('bathwaterApp.services')
		.factory('inventoryService',['$http',InventoryServiceHandler]);	

})(window.angular);