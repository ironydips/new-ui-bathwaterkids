(function(angular) {
    'use strict';

    function DeleteConfirmationModalController($state, inventoryService) {
        var ctrl = this;
        ctrl.inventory = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.deleteAdmin = function() {
             ctrl.loader = true;
             updateItem("REJECTED");
        };

        ctrl.acceptItem = function() {
            ctrl.loader = true;
            updateItem("STORED");

            // inventoryService.updateInventory(ctrl.inventory.storedItemId, "STORED")
            //     .then(function(response) {
            //         ctrl.loader = false;
            //         ctrl.modalInstance.close({ action: 'update' });
            //     })
            //     .catch(function(err) {
            //         console.log('Error getting user-items details:');
            //         console.log(err);
            //     });
        }
        function updateItem(status){
            inventoryService.updateItemStatus(ctrl.inventory.storedItemId, status)
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.loader = false;
                        ctrl.modalInstance.close({ action: 'update' });
                    }
                })
                .catch(function(err) {
                    console.log('Error in deleting Admin from admin list lists:');
                    console.log(err);
                })
        }
    }

    angular.module('deleteConfirmationModal')
        .component('deleteConfirmationModal', {
            templateUrl: 'inventory/delete-confirmation-modal/delete-confirmation-modal.template.html',
            controller: ['$state', 'inventoryService', DeleteConfirmationModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
