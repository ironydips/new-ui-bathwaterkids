(function(angular) {
    'use strict';

    function ReceiveItemModalController($state, warehouseMoveItems) {
        var ctrl = this;
        ctrl.items = warehouseMoveItems.getMovedSavedItems();

        ctrl.save = function() {

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('receiveincomingProductModal')
        .component('receiveincomingProductModal', {
            templateUrl: 'warehouse/incoming/receiveItem-modal/receiveItem-modal.template.html',
            controller: ['$state', 'warehouseMoveItems', ReceiveItemModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
