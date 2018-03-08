(function(angular) {
    'use strict';

    function customerSubItemModalController($state, $scope, Lightbox) {
        var ctrl = this;
        ctrl.imageURLs = [];
        ctrl.subItem = {imageUrl : []};
        ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.init = function() {
            if (ctrl.item.subItems) {
                ctrl.subItems = ctrl.item.subItems;

                for (var i = 0; i < ctrl.subItems.length; i++) {
                    for (var j = 0; j <= i; j++) {
                        // if(ctrl.item.subItems[i].imageUrl){
                        //     ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageUrl;
                        // }
                        // if ((ctrl.item.subItems[i].hasOwnProperty("imageURLs")  && ctrl.item.subItems[i].imageURLs[0] == "") || ctrl.item.subItems[i].imageURLs == "undefined") {
                        //     ctrl.item.subItems[i].imageUrl = "img/not-available.jpg";
                        // }

                        if(ctrl.item.subItems[i].imageURLs && ctrl.item.subItems[i].imageURLs.length > 0 && ctrl.item.subItems[i].imagesBase64){
                            ctrl.item.subItems[i].imageUrl = 'data:image/jpeg;base64, ' + ctrl.item.subItems[i].imageURLs[0];
                        }
                        if (ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length > 0 && !ctrl.item.subItems[i].imagesBase64) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageURLs;
                        }
                        
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
        // $scope.$watch(angular.bind(ctrl, function() {
        //     return ctrl.subItemImage;
        // }), function(value) {
        //     value ?
        //         (ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase64 = value.base64) : (ctrl.subItem.imagesBase64 = '');
        // });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage;
        }), function(value) {
            value ?
                (ctrl.imageUrl1 = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase64 = value.base64) : (ctrl.subItem.imagesBase64 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage2;
        }), function(value) {
            value ?
                (ctrl.imageUrl2 = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase642 = value.base64) : (ctrl.subItem.imagesBase642 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage3;
        }), function(value) {
            value ?
                (ctrl.imageUrl3 = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase643 = value.base64) : (ctrl.subItem.imagesBase643 = '');
        });
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.save = function() {
            ctrl.imageUrl1 = ctrl.imageUrl1 ? ctrl.imageUrl1 : "img/not-available.jpg";
            ctrl.imageUrl2 = ctrl.imageUrl2 ? ctrl.imageUrl2 : "img/not-available.jpg";
            ctrl.imageUrl3 = ctrl.imageUrl3 ? ctrl.imageUrl3 : "img/not-available.jpg";
            ctrl.subItem.imageUrl.push(ctrl.imageUrl1, ctrl.imageUrl2, ctrl.imageUrl3);
            debugger;
            if (ctrl.subItem.imagesBase64 || ctrl.subItem.imagesBase642 || ctrl.subItem.imagesBase643) {
                ctrl.subItem.imageURLs = [ctrl.subItem.imagesBase64, ctrl.subItem.imagesBase642 , ctrl.subItem.imagesBase643];
            } else {
                ctrl.subItem.imageURLs = [""];
                ctrl.imageUrl = "img/not-available.jpg";
            }
            debugger;
            //ctrl.subItem.imageUrl = ctrl.imageUrl;
            ctrl.modalInstance.close({ action: 'update', subItem: ctrl.subItem });
        };
        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state', '$scope','Lightbox', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
