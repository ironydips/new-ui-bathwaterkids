(function(angular) {

    'use strict';

    function savedProductPopUp(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'addInventoryModal',
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

    function incomingProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'incomingShowAllModal',
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


    function IncomingController($state, $uibModal) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.products = [{
            "isChecked": false,
            "truckID": 12345678,
            "noOfItems": 34
        }, {
            "isChecked": false,
            "truckID": 43434343,
            "noOfItems": 12
        }, {
            "isChecked": false,
            "truckID": 65665,
            "noOfItems": 89
        }, {
            "isChecked": false,
            "truckID": 787777878,
            "noOfItems": 77
        }, {
            "isChecked": false,
            "truckID": 12566,
            "noOfItems": 65
        }];

        ctrl.init = function() {

        };

        ctrl.viewSavedItems = function() {
            angular.bind(ctrl, savedProductPopUp, null)();
        };

        ctrl.showallSavedItems = function(truckID) {
            angular.bind(ctrl, incomingProductPopup, truckID)();
        };

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };


        ctrl.init();
    }

    angular.module('incomingWarehouseDetails')
        .component('incomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/incoming-details/incoming-details.template.html',
            controller: ['$state', '$uibModal', IncomingController]
        });
})(window.angular);
