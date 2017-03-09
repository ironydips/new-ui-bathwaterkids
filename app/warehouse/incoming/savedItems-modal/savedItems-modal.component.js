(function(angular) {
    'use strict';

    function addInventoryModalController($state, warehouseMoveItems) {
        var ctrl = this;
        ctrl.items = warehouseMoveItems.getMovedSavedItems();

        ctrl.save = function() {

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('addInventoryModal')
        .component('addInventoryModal', {
            templateUrl: 'warehouse/incoming/savedItems-modal/savedItems-modal.template.html',
            controller: ['$state', 'warehouseMoveItems', addInventoryModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
