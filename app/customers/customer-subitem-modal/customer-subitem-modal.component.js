(function(angular) {
    'use strict';

    function customerSubItemModalController($state, $scope, Lightbox, customerUserService) {
        var ctrl = this;
        ctrl.imageURLs = [];
        ctrl.subItem = {};
        ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.init = function() {
            debugger;
            if (ctrl.item.subItems && !ctrl.item.itemToEdit) {
                ctrl.subItems = ctrl.item.subItems;
                for (var i = 0; i < ctrl.subItems.length; i++) {
                    for (var j = 0; j <= i; j++) {
                        debugger;
                        if (!ctrl.item.subItems[i].hasOwnProperty("imageUrl") && ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length > 0) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageURLs;
                        }
                        // if (ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs.length == 0) {
                        //     ctrl.item.subItems[i].imageUrl = ["img/not-available.jpg"];
                        // }
                        // if ((ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].imageURLs[0] == "")) {
                        //     ctrl.item.subItems[i].imageUrl = ["img/not-available.jpg"];
                        // }
                        if (!ctrl.item.subItems[i].hasOwnProperty("imageURLs") && ctrl.item.subItems[i].hasOwnProperty("imageUrl") && ctrl.item.subItems[i].imageUrl.length > 0) {
                            ctrl.item.subItems[i].imageUrl = ctrl.item.subItems[i].imageUrl;
                        }
                    }
                }
            } else {
                //display no record found
            }
            if (ctrl.item && ctrl.item.length > 0 && ctrl.item[0].imageURLs.length > 0) {
                ctrl.bool = true;
                ctrl.subItem = ctrl.item[0];
                ctrl.item.subItems = true;
                if (ctrl.item[0] && ctrl.item[0].imageURLs.length > 0) {
                    if (ctrl.item[0].imageURLs[0]) ctrl.imageUrl = ctrl.item[0].imageURLs[0];
                    if (ctrl.item[0].imageURLs[1]) ctrl.imageUrl2 = ctrl.item[0].imageURLs[1];
                    if (ctrl.item[0].imageURLs[2]) ctrl.imageUrl3 = ctrl.item[0].imageURLs[2];
                }
                debugger;
            }
            //Edit subitem inside edit modal
            if (Object.keys(ctrl.item).length > 0 && !ctrl.item.hasOwnProperty('userRequestID') && !ctrl.item.hasOwnProperty('imagesBase64') && !ctrl.item.hasOwnProperty('imagesBase642') && !ctrl.item.hasOwnProperty('imagesBase643')) {
                ctrl.subItem = ctrl.item;
                if (ctrl.item && ctrl.item.imageURLs.length > 0) {
                    if (ctrl.item.imageURLs[0]) ctrl.imageUrl = ctrl.item.imageURLs[0];
                    if (ctrl.item.imageURLs[1]) ctrl.imageUrl2 = ctrl.item.imageURLs[1];
                    if (ctrl.item.imageURLs[2]) ctrl.imageUrl3 = ctrl.item.imageURLs[2];
                }
            }
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
                                if (ctrl.subItem.imageUrl && ctrl.subItem.imageUrl[0]) {
                                    ctrl.subItem.imageUrl[0] = result.data.imageUrl;
                                }
                                ctrl.loader = false;

                                break;
                            case 'secondImage':
                                ctrl.imageUrl2 = result.data.imageUrl;
                                if (ctrl.subItem.imageUrl && ctrl.subItem.imageUrl[1]) {
                                    ctrl.subItem.imageUrl[1] = result.data.imageUrl;
                                }
                                ctrl.loader = false;
                                break;
                            case 'thirdImage':
                                ctrl.imageUrl3 = result.data.imageUrl;
                                if (ctrl.subItem.imageUrl && ctrl.subItem.imageUrl[2]) {
                                    ctrl.subItem.imageUrl[2] = result.data.imageUrl;
                                }
                                ctrl.loader = false;
                                break;

                        }

                    } else {
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
        ctrl.updateSubItem = function() {
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
            ctrl.modalInstance.close({ action: 'updateSubitem', subItem: ctrl.subItem });
        }
        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            debugger;
            var imagArr = images.filter(function(data) {
                if (data && data != "blank image") return data;
            });
            Lightbox.openModal(imagArr, 0);
        };
        ctrl.init();
    }

    angular.module('customerSubItemModal')
        .component('customerSubItemModal', {
            templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
            controller: ['$state', '$scope', 'Lightbox', 'customerUserService', customerSubItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
