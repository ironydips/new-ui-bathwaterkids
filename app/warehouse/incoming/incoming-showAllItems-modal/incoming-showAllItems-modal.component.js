(function(angular) {

    'use strict';

    function IncomingShowAllModal($state, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.truckID = (ctrl.resolve && ctrl.resolve.details || {});
        ctrl.disableItem = true;
        ctrl.showSaveButton = false;
        ctrl.disableActionBtn = true;
        ctrl.itemArray = [];

        ctrl.selectedItems = [{

            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping"

        }, {
            "isChecked": false,
            "barcode": "BWER12344",
            "itemName": "stroller",
            "status": "swapping"

        }, {
            "isChecked": false,
            "barcode": "BWQWT44",
            "itemName": "stroller",
            "status": "swapping"

        }, {
            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping"

        }, {
            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping"

        }];

        ctrl.init = function() {


        };
        ctrl.editItems = function() {
            ctrl.disableItem = false;
            ctrl.showSaveButton = true;

        };

        ctrl.saveChanges = function() {
            ctrl.disableItem = true;
            ctrl.showSaveButton = false;
        };

        ctrl.cancelshowall = function() {
            ctrl.modalInstance.close();
        };

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.enableButton = function(item) {

            if (item.isChecked) {
                ctrl.itemArray.push(item);

                for (var i = 0; i < ctrl.itemArray.length; i++) {
                    if (ctrl.itemArray[i].isChecked) {
                        ctrl.disableActionBtn = false;
                    }
                }
            } else {

                ctrl.itemArray.pop(item);
                if (ctrl.itemArray.length == 0) {
                    ctrl.disableActionBtn = true;
                }
            }
        };

        ctrl.saveItem = function() {

            for (var i = 0; i < ctrl.itemArray.length; i++) {
                ctrl.itemArray[i]["truckID"] = ctrl.truckID;
                warehouseMoveItemService.moveItems(ctrl.itemArray[i]);
                ctrl.modalInstance.close();
            }

        }

        ctrl.init();
    }

    angular.module('incomingShowAllModal')
        .component('incomingShowAllModal', {
            templateUrl: 'warehouse/incoming/incoming-showAllItems-modal/incoming-showAllItems-modal.template.html',
            controller: ['$state', 'warehouseMoveItemService', IncomingShowAllModal],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
