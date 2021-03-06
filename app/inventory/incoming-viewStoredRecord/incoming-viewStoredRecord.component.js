(function(angular) {
    'use strict';

    function openPopupCreditUpdate(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'updateCreditModal',
            windowClass: 'app-modal-window-small',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if (data && data.action == "update");
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in inventory-incoming-credit-update Modal');
                console.log(err);
            }
    }
       function openSubItem(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'customerSubItemModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if (data && data.action == "update");

            }),
            function(err) {
                console.log('Error in SubItem Modal');
                console.log(err);
            }
    }

    function InventoryStoredRecordsDetailsController($state, $uibModal, Lightbox, inventoryService) {
        var ctrl = this;
        ctrl.$state = $state;
        ctrl.$uibModal = $uibModal;

        ctrl.init = function() {
            ctrl.loader = true;
            ctrl.message = false;
            inventoryService.getInventory("others")
                .then(function(response) {
                    ctrl.loader = false;
                    ctrl.Inventory = response.data;
                    for (var i = 0; i < ctrl.Inventory.length; i++) {
                        if (ctrl.Inventory[i].hasOwnProperty('imageURLs') && ctrl.Inventory[i].imageURLs.length) {
                            ctrl.Inventory[i].imageUrl = ctrl.Inventory[i].imageURLs;
                        } else {
                            let arr = ["img/not-available.jpg"];
                            ctrl.Inventory[i].imageUrl = arr;
                        }
                    }
                    ctrl.message = ctrl.Inventory.length == 0;
                })
                .catch(function(err) {
                    console.log('Error getting user-items details:');
                    console.log(err);
                });

        };

        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.addUpdateCredit = function(item) {
            angular.bind(ctrl, openPopupCreditUpdate, angular.copy(item))();
        };
        ctrl.subItems = function(subitem) {
            angular.bind(ctrl, openSubItem, subitem)();
        };

        ctrl.init();
    }

    angular.module('inventoryStoredRecordsDetails')
        .component('inventoryStoredRecordsDetails', {
            templateUrl: 'inventory/incoming-viewStoredRecord/incoming-viewStoredRecord.template.html',
            controller: ['$state', '$uibModal', 'Lightbox', 'inventoryService', InventoryStoredRecordsDetailsController]
        });

})(window.angular);
