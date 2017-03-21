(function(angular) {

    'use strict';

    function OutgoingAssignTruckModal($state, ngToast, warehouseMoveItems) {
        var ctrl = this;
        ctrl.item = (ctrl.resolve && ctrl.resolve.details || {});

        ctrl.init = function() {


        };
        ctrl.outbound = function() {
            warehouseMoveItems.updateItemInWarehouse(ctrl.item.storedItemId, ctrl.item.location, "OUTBOUND")
                .then(function(result) {
                    ctrl.modalInstance.close({ action: 'update' });
                    
                })
                .catch(function(err) {
                    console.log('Error updating status & location of item in warehouse');
                    console.log(err);
                });
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };


        ctrl.init();
    }

    angular.module('outgoingAssignTruckModal')
        .component('outgoingAssignTruckModal', {
            templateUrl: 'warehouse/warehouse-outgoing/outgoing-assignTruck-modal/outgoing-assignTruck-modal.template.html',
            controller: ['$state','ngToast', 'warehouseMoveItems', OutgoingAssignTruckModal],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
