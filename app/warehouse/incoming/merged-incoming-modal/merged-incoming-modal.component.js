(function(angular) {

    'use strict';

    function mergeincomingProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'mergeincomingShowAllModal',
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
                console.log('Error in save products Modal');
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


    function MergedIncomingController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.products = [{
            "isChecked": false,
            "truckID": 12345678,
            "status": "pickup",
            "noOfItems": 34
        }, {
            "isChecked": false,
            "truckID": 43434343,
            "status": "pickup",
            "noOfItems": 12
        }, {
            "isChecked": false,
            "truckID": 65665,
            "status": "pickup",
            "noOfItems": 89
        }, {
            "isChecked": false,
            "truckID": 787777878,
            "status": "pickup",
            "noOfItems": 77
        }, {
            "isChecked": false,
            "truckID": 12566,
            "status": "pickup",
            "noOfItems": 65
        }];

        ctrl.init = function() {

        };

        ctrl.viewReceivedItems = function() {
            angular.bind(ctrl, receiveincomingProductPopup, null)();
        };

        ctrl.viewStoredItems = function() {
            angular.bind(ctrl, storedProductPopup, null)();
        };

        ctrl.showallSavedItems = function() {
            angular.bind(ctrl, mergeincomingProductPopup, null)();
        };

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.selectedDate = function(date){

            warehouseMoveItemService.outgoingItems(date)
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(err) {
                    console.log('Error getting outgoing item status details:');
                    console.log(err);
                });

                 warehouseMoveItemService.incomingItems(date)
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(err) {
                    console.log('Error getting incoming item status details:');
                    console.log(err);
                });
        }

        ctrl.init();
    }

    angular.module('mergedIncomingWarehouseDetails')
        .component('mergedIncomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/merged-incoming-modal/merged-incoming-modal.template.html',
            controller: ['$state', '$uibModal','warehouseMoveItemService', MergedIncomingController]
        });
})(window.angular);
