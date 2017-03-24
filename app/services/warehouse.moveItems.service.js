(function(angular) {

    "use strict";

    function WarehouseMoveItemService($http) {

        var itemArray = [];

        var moveItems = function(items) {
            itemArray = itemArray.concat(items);
        };

        var getMovedSavedItems = function() {
            return itemArray;
        };

        var getItemsByStatus = function(status){
            return $http({
                    url: '/rest/admin/getItemsByStatus?status='+ status,
                    method: "GET",
                    headers:{
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                }
            });
        };

        var updateItemInWarehouse = function(storedItemID, location, status){
            return $http({
                    url: '/rest/admin/updateItemInWarehouse?storedItemID='+ storedItemID + '&status='+ status + '&location=' + location,
                    method: "GET",
                    headers:{
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                }
            });
        };

        var updateDropItemStatus = function(storedItemID, location, status, subitemCode){
            return $http({
                    url: '/rest/admin/updateDropItemStatus?storedItemID='+ storedItemID + '&status='+ status + '&subitemCode=' +subitemCode+ '&location=' + location,
                    method: "GET",
                    headers:{
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                }
            });
        };

        var outgoingItems = function(date){
            return $http({
                    url: '/rest/admin/outgoingItems?date='+ date,
                    method: "GET",
                    headers:{
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                }
            });
        };

        var incomingItems = function(date){
            return $http({
                    url: '/rest/admin/incomingItems?date='+ date,
                    method: "GET",
                    headers:{
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                }
            });
        };


        return {

            moveItems,
            getMovedSavedItems,
            getItemsByStatus,
            updateItemInWarehouse,
            updateDropItemStatus,
            outgoingItems,
            incomingItems

        }

    }

    angular.module('bathwaterApp.services')
        .factory("warehouseMoveItemService", ['$http',WarehouseMoveItemService]);

})(window.angular);
