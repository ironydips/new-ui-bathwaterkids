(function(angular) {

    'use strict';

    function IncomingShowAllModal($state) {
        var ctrl = this;
        ctrl.disableItem = true;
        ctrl.showSaveButton = false;
        ctrl.disableActionBtn = true;
        ctrl.itemArray = [];

        ctrl.selectedItems = [{

            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping",
            "category": "abc",
            "credit": 12,
            "location": "xyz"
        }, {
            "isChecked": false,
            "barcode": "BWER12344",
            "itemName": "stroller",
            "status": "swapping",
            "category": "qwer",
            "credit": 67,
            "location": "a"
        }, {
            "isChecked": false,
            "barcode": "BWQWT44",
            "itemName": "stroller",
            "status": "swapping",
            "category": "b",
            "credit": 23,
            "location": "g"
        }, {
            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping",
            "category": "abc",
            "credit": 12,
            "location": "xyz"
        }, {
            "isChecked": false,
            "barcode": "BWER1234",
            "itemName": "stroller",
            "status": "swapping",
            "category": "abc",
            "credit": 12,
            "location": "xyz"
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

        ctrl.selectRow = function(rowIndex){
         ctrl.selectedRow = rowIndex;
        };

        ctrl.enableButton = function(item) {


            if (item.isChecked) {
                ctrl.itemArray.push(item);
                // console.log(ctrl.itemArray)
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
        }

        ctrl.init();
    }

    angular.module('incomingShowAllModal')
        .component('incomingShowAllModal', {
            templateUrl: 'warehouse/incoming/incoming-showAllItems-modal/incoming-showAllItems-modal.template.html',
            controller: ['$state', IncomingShowAllModal],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular);
