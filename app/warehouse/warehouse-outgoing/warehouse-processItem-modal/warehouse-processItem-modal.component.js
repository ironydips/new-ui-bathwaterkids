(function(angular) {

    'use strict';

    function processItemsModalController($state) {
        var ctrl = this;
        ctrl.disableActionBtn = true;
        ctrl.checkCount = 0;
        ctrl.itemArray = [];

        ctrl.processItems = [{
            "isChecked": false,
            "scanCode": "BWe12345",
            "location": "x",
            "itemName": "a"
        }, {
            "isChecked": false,
            "scanCode": "BWe10009",
            "location": "y",
            "itemName": "b"
        }, {
            "isChecked": false,
            "scanCode": "BWe122345",
            "location": "z",
            "itemName": "c"
        }, {
            "isChecked": false,
            "scanCode": "BWe12wer",
            "location": "r",
            "itemName": "d"
        }, {
            "isChecked": false,
            "scanCode": "BWe12345",
            "location": "x",
            "itemName": "a"
        }];

        ctrl.enableSaveBtn = function(item) {

            if (item.isChecked) {

                ctrl.itemArray.push(item);
                if (ctrl.itemArray.length == ctrl.processItems.length) {
                    ctrl.disableActionBtn = false;
                } else {
                    ctrl.disableActionBtn = true;
                }

            } else {

                ctrl.itemArray.pop(item);
                if (ctrl.itemArray.length >= 0) {
                    ctrl.disableActionBtn = true;
                }

            }
        };

        ctrl.saveItem = function() {
            ctrl.modalInstance.close();
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('processItemsModal')
        .component('processItemsModal', {
            templateUrl: 'warehouse/warehouse-outgoing/warehouse-processItem-modal/warehouse-processItem-modal.template.html',
            controller: ['$state', processItemsModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
