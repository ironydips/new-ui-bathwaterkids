(function(angular) {

    'use strict';

    function driverInfoPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'driverInfoModal',
            windowClass: 'app-modal-window-small',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in driver-Info Modal');
                console.log(err);
            }

    }

    function viewItemPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewOutgoingTruckItemModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view item Modal');
                console.log(err);
            }

    }

    function receiveincomingProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'receiveincomingProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view product Modal');
                console.log(err);
            }

    }

    function storedProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'storedProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view product Modal');
                console.log(err);
            }

    }


    function TruckItemOutgoingController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.dropItemArray = [];
        ctrl.dropItem = [];

        ctrl.init = function() {

        };

        ctrl.viewReceivedItems = function() {
            angular.bind(ctrl, receiveincomingProductPopup, null)();
        };

        ctrl.viewStoredItems = function() {
            angular.bind(ctrl, storedProductPopup, null)();
        };

        ctrl.viewItems = function(item) {
            angular.bind(ctrl, viewItemPopup, null)();
        };

        ctrl.viewDriverDetail = function() {
            angular.bind(ctrl, driverInfoPopup, null)();
        }

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.selectedDate = function(date) {

            // warehouseMoveItemService.outgoingItems(date)
            //     .then(function(response) {
            //         console.log(response)
            //     })
            //     .catch(function(err) {
            //         console.log('Error getting outgoing item status details:');
            //         console.log(err);
            //     });
            // warehouseMoveItemService.incomingItems(date)
            //     .then(function(response) {
            //         if (angular.isArray(response.data)) {
            //             ctrl.message = false;
            //             ctrl.incomingItems = response.data;

            //             console.log(ctrl.incomingItems)
            //             for (var i = 0; i < ctrl.incomingItems.length; i++) {
            //                 if (ctrl.incomingItems[i].type == undefined) {
            //                     ctrl.dropItem.push(ctrl.incomingItems[i]);
            //                     for (var j = 0; j <= ctrl.incomingItems[i].items.length - 1; j++) {
                                    
            //                         if (ctrl.incomingItems[i].items[j].type == "drop off") {
            //                             //if (ctrl.dropItem.length == 0) {

            //                             ctrl.dropItemArray.push(ctrl.incomingItems[i].items[j]);
            //                             console.log(ctrl.dropItemArray)
            //                         } else {
            //                             console.log("no dropoff");
            //                         }

            //                     }
            //                 }

            //             }
            //         } else {

            //         }

            //     })
            //     .catch(function(err) {
            //         console.log('Error getting outgoing item status details:');
            //         console.log(err);
            //     });

        }

        ctrl.init();
    }

    angular.module('truckItemOutgoingWarehouseDetails')
        .component('truckItemOutgoingWarehouseDetails', {
            templateUrl: 'warehouse/warehouse-outgoing/truckItem-outgoing-details/truckItem-outgoing-details.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService', TruckItemOutgoingController]
        });
})(window.angular);
