(function(angular) {
	"use strict";
	
	function InventoryServiceHandler($http){

		
		var getInventory = function(){
			return $http({
		            url: '/rest/getItems',
		            method: "GET",
		            headers:{
	            		//"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		var updateInventory = function(storedItemID, oldCredits, newCredits, userRequestId){
			return $http({
		            url: '/rest/admin/updateCredits?storedID='+storedItemID +'&oldCredits=' + oldCredits + '&newCredits=' + newCredits,
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