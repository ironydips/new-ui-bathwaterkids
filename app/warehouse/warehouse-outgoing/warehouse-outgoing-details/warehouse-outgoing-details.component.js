(function(angular) {

    'use strict';

    function processItems(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'processItemsModal',
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
                console.log('Error in add-timeslot Modal');
                console.log(err);
            }

    }


    function OutgoingController($state, $uibModal) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.products = [{
            "order": "order 1",
            "noOfItems": 5
        }, {
            "order": "order 2",
            "noOfItems": 5
        }, {
            "order": "order 3",
            "noOfItems": 5
        }, {
            "order": "order 4",
            "noOfItems": 5
        }, {
            "order": "order 5",
            "noOfItems": 5
        }];

        ctrl.init = function() {

        };

        ctrl.processItem = function() {
            angular.bind(ctrl, processItems, null)();
        };

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };


        ctrl.init();
    }

    angular.module('outgoingWarehouseDetails')
        .component('outgoingWarehouseDetails', {
            templateUrl: 'warehouse/warehouse-outgoing/warehouse-outgoing-details/warehouse-outgoing-details.template.html',
            controller: ['$state', '$uibModal', OutgoingController]
        });
})(window.angular);
