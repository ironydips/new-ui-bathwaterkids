(function(angular) {

    "use strict";

    function WarehouseMoveItems($http) {

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


        return {

            moveItems,
            getMovedSavedItems,
            getItemsByStatus,
            updateItemInWarehouse,
            updateDropItemStatus

        }

    }

    angular.module('bathwaterApp.services')
        .factory("warehouseMoveItems", ['$http',WarehouseMoveItems]);

})(window.angular);
