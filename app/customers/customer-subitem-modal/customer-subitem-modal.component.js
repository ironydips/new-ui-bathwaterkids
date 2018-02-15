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
                        // if(ctrl.item.subItems[i].imageUrl){
                        //     ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageUrl;
                        // }
                        if(ctrl.item.subItems[i].imageURLs && ctrl.item.subItems[i].imageURLs.length > 0 && ctrl.item.subItems[i].imagesBase64){
                            ctrl.item.subItems[i].imageUrl = 'data:image/jpeg;base64, ' + ctrl.item.subItems[i].imageURLs[0];
                        }
                        if (ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length > 0 && !ctrl.item.subItems[i].imagesBase64) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageURLs[0];
                        }
                        // if ((ctrl.item.subItems[i].hasOwnProperty("imageURLs")  && ctrl.item.subItems[i].imageURLs[0] == "") || ctrl.item.subItems[i].imageURLs == "undefined") {
                        //     ctrl.item.subItems[i].imageUrl = "img/not-available.jpg";
                        // }
                        if (ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length == 0) {
                            ctrl.item.subItems[i].imageUrl = "img/not-available.jpg";
                        }
                        if ((ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs[0] == "")) {
                            ctrl.item.subItems[i].imageUrl = "img/not-available.jpg";
                        }
                        if (!ctrl.item.subItems[i].hasOwnProperty("imageURLs")) {
                            ctrl.item.subItems[i].imageUrl = "img/not-available.jpg";
                        }
                    }
                }
            } else {
                //display no record found
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
        ctrl.save = function() {
            if (ctrl.subItem.imagesBase64) {
                ctrl.subItem.imageURLs = [ctrl.subItem.imagesBase64];
            } else {
                ctrl.subItem.imageURLs = [""];
                ctrl.imageUrl = "img/not-available.jpg";
            }
            ctrl.subItem.imageUrl = ctrl.imageUrl;
            ctrl.modalInstance.close({ action: 'update', subItem: ctrl.subItem });
        }
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state', '$scope', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
