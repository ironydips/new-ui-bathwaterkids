(function(angular) {
    'use strict';

    function customerSubItemModalController($state) {
        var ctrl = this;
        ctrl.imageURLs = [];
        ctrl.subItem = {};
        ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.init = function() {
            if (ctrl.item.subItems) {
                ctrl.subItems = ctrl.item.subItems;
                for (var i = 0; i < ctrl.subItems.length; i++) {
                    for (var j = 0; j <= i; j++) {
                        if (ctrl.item.subItems[i].imageURLs) {
                            ctrl.imageURLs.push(ctrl.item.subItems[i].imageURLs[j]);
                        }
                    }
                }
            }else{

            }
        };
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.save = function(){
            ctrl.modalInstance.close({ action: 'update', subItem: ctrl.subItem });
        }
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
