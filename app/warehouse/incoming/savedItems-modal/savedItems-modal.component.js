(function(angular) {
    'use strict';

    function addInventoryModalController($state, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.items = warehouseMoveItemService.getMovedSavedItems();

        ctrl.save = function() {

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('addInventoryModal')
        .component('addInventoryModal', {
            templateUrl: 'warehouse/incoming/savedItems-modal/savedItems-modal.template.html',
            controller: ['$state', 'warehouseMoveItemService', addInventoryModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
