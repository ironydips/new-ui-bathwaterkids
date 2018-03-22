(function(angular) {
    'use strict';

    function updateCreditModalController($state, inventoryService) {
        var ctrl = this;
        ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
        //ctrl.item.oldCredits = ctrl.item.newCredits;
        if(ctrl.item.credits) ctrl.item.newCredits = ctrl.item.credits;

        ctrl.save = function(credit) {
            //ctrl.loader = true;
            if (ctrl.item.storedItemId) {
            	//ctrl.item.oldCredits = 0;
                inventoryService.updateInventory(ctrl.item.storedItemId, ctrl.item.newCredits)
                    .then(function(response) {
                        ctrl.loader = false;
                        ctrl.modalInstance.close({ action: 'update' });
                    })
                    .catch(function(err) {
                        console.log('Error getting user-items details:');
                        console.log(err);
                    });
            } else {
                ctrl.modalInstance.close({ action: 'update', item: ctrl.item });
            }

        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

    }

    angular.module('updateCreditModal')
        .component('updateCreditModal', {
            templateUrl: 'inventory/update-credit-modal/update-credit-modal.template.html',
            controller: ['$state', 'inventoryService', updateCreditModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
