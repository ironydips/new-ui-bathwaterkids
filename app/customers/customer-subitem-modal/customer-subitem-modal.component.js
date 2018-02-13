(function(angular) {
    'use strict';

    function customerSubItemModalController($state, $scope) {
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
        $scope.$watch(angular.bind(ctrl, function() {
                return ctrl.subItemImage;
            }), function(value) {
                value ?
                    (ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase64 = value.base64) : (ctrl.subItem.imagesBase64 = '');
            });
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.save = function(){
            if(ctrl.subItem.imagesBase64){
                ctrl.subItem.imageURLs = [ctrl.subItem.imagesBase64];
            }else{
                ctrl.subItem.imageURLs = [""];
            }
            debugger;
            ctrl.modalInstance.close({ action: 'update', subItem: ctrl.subItem });
        }
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state','$scope', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
