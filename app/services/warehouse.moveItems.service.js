(function(angular) {

    "use strict";

    function WarehouseMoveItems() {

        var itemArray = [];

        var moveItems = function(items) {
            itemArray = itemArray.concat(items);
        };

        var getMovedSavedItems = function() {
            return itemArray;
        }


        return {

            moveItems,
            getMovedSavedItems

        }

    }

    angular.module('bathwaterApp.services')
        .factory("warehouseMoveItems", [WarehouseMoveItems]);

})(window.angular);
