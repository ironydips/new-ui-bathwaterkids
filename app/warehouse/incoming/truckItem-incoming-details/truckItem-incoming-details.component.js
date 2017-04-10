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

                if (data && data.action == 'update') popUpCtrl.selectedDate(data.date);
            }),
            function(err) {
                console.log('Error in view item modal');
                console.log(err);
            }

    }

    function receiveIncomingProductPopup(details) {

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
                console.log('Error in receive incoming item modal');
                console.log(err);
            }

    }

    function storedIncomingProductPopup(details) {

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
                console.log('Error in stored incoming item modal');
                console.log(err);
            }

    }


    function TruckItemIncomingController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.init = function() {

        };

        ctrl.viewReceivedItems = function() {
            angular.bind(ctrl, receiveIncomingProductPopup, null)();
        };

        ctrl.viewStoredItems = function() {
            angular.bind(ctrl, storedIncomingProductPopup, null)();
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

             warehouseMoveItemService.outgoingItems(date)
                .then(function(response) {
                    console.log(response)

                })
                .catch(function(err) {
                    console.log('Error getting outgoingItems details:');
                    console.log(err);
                });

            warehouseMoveItemService.incomingItems(date)
                .then(function(response) {
                    if (angular.isArray(response.data)) {
                        ctrl.message = false;
                        ctrl.incomingItems = response.data;
                    } else {
                        ctrl.message = true;
                    }

                })
                .catch(function(err) {
                    console.log('Error getting incoming item details:');
                    console.log(err);
                });
        }

        ctrl.init();
    }

    angular.module('truckItemIncomingWarehouseDetails')
        .component('truckItemIncomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/truckItem-incoming-details/truckItem-incoming-details.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService', TruckItemIncomingController]
        });
})(window.angular);
