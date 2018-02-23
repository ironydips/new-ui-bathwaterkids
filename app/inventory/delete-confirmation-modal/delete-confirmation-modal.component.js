(function(angular) {
    'use strict';

    function DeleteConfirmationModalController($state, inventoryService) {
        var ctrl = this;
        ctrl.inventory = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.deleteAdmin = function() {
           
            inventoryService.updateItemStatus(ctrl.inventory.storedItemId, "REJECTED")
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
