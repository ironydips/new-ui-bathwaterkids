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
            component: 'viewTruckItemModal',
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


    function TruckItemIncomingController($state, $uibModal, moment, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.init = function() {
            ctrl.loader = true;
            ctrl.date = moment().format("MM.DD.YYYY");
            ctrl.selectedDate(ctrl.date);
        };

        ctrl.viewReceivedItems = function() {
            angular.bind(ctrl, receiveincomingProductPopup, null)();
        };

        ctrl.viewStoredItems = function() {
            angular.bind(ctrl, storedProductPopup, null)();
        };

        ctrl.viewItems = function(item) {
            angular.bind(ctrl, viewItemPopup, item)();
        };

        ctrl.viewDriverDetail = function(driverInfo) {
            angular.bind(ctrl, driverInfoPopup, driverInfo)();
        }

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.selectedDate = function(date) {
            ctrl.loader = false;
            ctrl.message = true;
            // warehouseMoveItemService.incomingItems(date)
            //     .then(function(response) {
            //         ctrl.loader = false;
            //         if (angular.isArray(response.data)) {
            //             ctrl.message = false;
            //             ctrl.incomingItems = response.data;
            //             // for (var i = 0; i < ctrl.incomingItems.length; i++) {
            //             //         ctrl.incomingDetail = ctrl.incomingItems[i];
            //             //         console.log(ctrl.incomingDetail)
            //             // }
            //         } else {
            //             ctrl.message = true;
            //         }

            //     })
            //     .catch(function(err) {
            //         console.log('Error getting incoming item status details:');
            //         console.log(err);
            //     });
        }

        ctrl.init();
    }

    angular.module('truckItemIncomingWarehouseDetails')
        .component('truckItemIncomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/truckItem-incoming-details/truckItem-incoming-details.template.html',
            controller: ['$state', '$uibModal', 'moment', 'warehouseMoveItemService', TruckItemIncomingController]
        });
})(window.angular);
