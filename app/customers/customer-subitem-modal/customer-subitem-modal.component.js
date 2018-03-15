(function(angular) {
    'use strict';

    function customerSubItemModalController($state, $scope,Lightbox, customerUserService) {
        var ctrl = this;
        ctrl.imageURLs = [];
        ctrl.subItem = {};
        ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.init = function() {
            if (ctrl.item.subItems && !ctrl.item.itemToEdit) {
                ctrl.subItems = ctrl.item.subItems;
                for (var i = 0; i < ctrl.subItems.length; i++) {
                    for (var j = 0; j <= i; j++) {

                        if (!ctrl.item.subItems[i].hasOwnProperty("imageUrl") && ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length > 0) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageURLs;
                        }
                        // if (ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length == 0) {
                        //     ctrl.item.subItems[i].imageUrl = ["img/not-available.jpg"];
                        // }
                        // if ((ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs[0] == "")) {
                        //     ctrl.item.subItems[i].imageUrl = ["img/not-available.jpg"];
                        // }
                        if (!ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].hasOwnProperty("imageUrl") && ctrl.item.subItems[i].imageUrl.length > 0 ) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageUrl;;
                        }
                    }
                }
            } else {
                //display no record found
            }
            if(ctrl.item.itemToEdit && ctrl.item.itemToEdit.subItems[0]){ debugger; ctrl.bool = true; ctrl.subItems = ctrl.item.itemToEdit.subItems[0]; }
        };
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage;
        }), function(value) {
            value ?
                (ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase64 = value.base64) : (ctrl.subItem.imagesBase64 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage2;
        }), function(value) {
            value ?
                (ctrl.imageUrl2 = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase642 = value.base64) : (ctrl.subItem.imagesBase64 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.subItemImage3;
        }), function(value) {
            value ?
                (ctrl.imageUrl3 = 'data:image/jpeg;base64, ' + value.base64, ctrl.subItem.imagesBase643 = value.base64) : (ctrl.subItem.imagesBase64 = '');
        });
         ctrl.imageUpload = function(imageBase64, txt) {
            ctrl.loader = true;
            customerUserService.saveImage(imageBase64)
                .then(function(result) {
                    if (result && result.data && result.data.statusCode == 200) {
                        switch (txt) {
                            case 'firstImage':
                                ctrl.imageUrl = result.data.imageUrl;
                                break;
                            case 'secondImage':
                                ctrl.imageUrl2 = result.data.imageUrl;
                                break;
                            case 'thirdImage':
                                ctrl.imageUrl3 = result.data.imageUrl;
                                break;

                        }
                        ctrl.loader = false;
                    }else{
                        ctrl.loader = false;
                    }
                })
                .catch(function(err) {
                    console.log('Error while Image Upload');
                    console.log(err);
                });
        }
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.save = function() {
            ctrl.loader = true;
            if (ctrl.imageUrl || ctrl.imageUrl2 || ctrl.imageUrl3) {
                ctrl.loader = false;
                debugger;
                ctrl.subItem.imageUrl = [ctrl.imageUrl, ctrl.imageUrl2, ctrl.imageUrl3];
                //ctrl.imageUrlls = [ctrl.imageUrl,ctrl.imageUrl2,ctrl.imageUrl3];
            } else {
                ctrl.subItem.imageUrl = [];
                //ctrl.imageUrlls = ["img/not-available.jpg","img/not-available.jpg","img/not-available.jpg"];
            }
            //ctrl.subItem.imageUrl = ctrl.imageUrlls;
            ctrl.modalInstance.close({ action: 'update', subItem: ctrl.subItem });
        };
        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            debugger;
            Lightbox.openModal(images, 0);
        };
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state', '$scope','Lightbox','customerUserService', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
