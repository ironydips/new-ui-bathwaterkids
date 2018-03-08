(function(angular) {
    'use strict';

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
                if (data && data.action == "update") {
                    popUpCtrl.updateSubitem(data.subItem);
                }

            }),
            function(err) {
                console.log('Error in SubItem Modal');
                console.log(err);
            }
    }

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
                if (data && data.action == "update") {
                    popUpCtrl.pickedupItems[data.item.index] = data.item;
                }

            }),
            function(err) {
                console.log('Error in inventory-incoming-credit-update Modal');
                console.log(err);
            }
    }

    function customerAddItemModalController($state, $scope, $uibModal,Lightbox, customerUserService, UserRequestService, DriverService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.requestDetails = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.pickup = { "boolSharable": "No", "itemCode": [], imageUrl: [] };
        ctrl.pickedupItems = [];
        ctrl.isSubItem = false;
        ctrl.viewItems = true;
        ctrl.showtable = false;
        ctrl.subItemArr = [];
        ctrl.imageUrl = '';

        ctrl.init = function() {


        };
        ctrl.setCategory = function(category) {
            ctrl.loader = true;
            customerUserService.getCategories(category)
                .then(function(userlist) {
                    ctrl.loader = false;
                    if (userlist && userlist.data) {
                        ctrl.message = false;
                        ctrl.categoryArr = userlist.data;
                    } else {
                        ctrl.message = true;
                    }
                })
                .catch(function(err) {
                    console.log('Error getting user details:');
                    console.log(err);
                });
        };
        ctrl.setSubCategory = function(subCategory) {
            ctrl.pickup.categoryID = subCategory.categoryID;
            ctrl.pickup.categoryName = subCategory.title;
        };
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.itemImage;
        }), function(value) {
            value ?
                (ctrl.imageUrl1 = 'data:image/jpeg;base64, ' + value.base64, ctrl.pickup.imagesBase64 = value.base64) : (ctrl.pickup.imagesBase64 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.itemImage2;
        }), function(value) {
            value ?
                (ctrl.imageUrl2 = 'data:image/jpeg;base64, ' + value.base64, ctrl.pickup.imagesBase642 = value.base64) : (ctrl.pickup.imagesBase642 = '');
        });
        $scope.$watch(angular.bind(ctrl, function() {
            return ctrl.itemImage3;
        }), function(value) {
            value ?
                (ctrl.imageUrl3 = 'data:image/jpeg;base64, ' + value.base64, ctrl.pickup.imagesBase643 = value.base64) : (ctrl.pickup.imagesBase643 = '');
        });

        ctrl.updateSubitem = function(subItem) {
            ctrl.subItemArr.push(subItem);

        }
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }

        ctrl.addSubItem = function() {
            ctrl.isSubItem = true;

        }
        ctrl.opensubItemModal = function(subitem) {
            angular.bind(ctrl, openSubItem, subitem)();
        }
        ctrl.subItems = function() {
            angular.bind(ctrl, openSubItem, ctrl.requestDetails.subItems)();
        };

        ctrl.submitItems = function() {
            ctrl.data = {
                "userRequestID": ctrl.requestDetails.userRequestID,
                "pickedupItems": ctrl.pickedupItems,
            }
            ctrl.loader = true;
            DriverService.pickup(ctrl.data)
                .then(function(result) {
                    ctrl.loader = false;
                    ctrl.modalInstance.close({ action: 'update' });
                })
                .catch(function(err) {
                    console.log('Error while Picked up Items');
                    console.log(err);
                });
            ctrl.viewItems = false;
        };
        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.addItem = function() {
            ctrl.viewItems = false;
            ctrl.showtable = false;
            ctrl.itemImage = '';
            ctrl.itemImage2 = '';
            ctrl.itemImage3 = '';
            ctrl.imageUrl1 = "";
            ctrl.imageUrl2 = "";
            ctrl.imageUrl3 = "";
            ctrl.pickup.imagesBase64 = "";
            ctrl.categoryArr = [];
            ctrl.pickup = { "boolSharable": "No", "itemCode": [], imageUrl: [] };
        }
        ctrl.back = function() {
            ctrl.viewItems = true;
            ctrl.showtable = true;
            ctrl.subItemArr = [];
        }

        ctrl.save = function() {
            ctrl.viewItems = true;
            ctrl.showtable = true;
            ctrl.pickup.newCredits = ctrl.pickup.newCredits || 0;
            ctrl.pickup.subItems = ctrl.subItemArr;
            ctrl.pickup.sharable = ctrl.pickup.boolSharable == 'Yes' ? 1 : 0;
            ctrl.pickup.itemCodes = [ctrl.pickup.itemCode];
            ctrl.imageUrl1 = ctrl.imageUrl1.includes(", ") ? ctrl.imageUrl1 : "img/not-available.jpg";
            ctrl.imageUrl2 = ctrl.imageUrl2.includes(", ") ? ctrl.imageUrl2 : "img/not-available.jpg";
            ctrl.imageUrl3 = ctrl.imageUrl3.includes(", ") ? ctrl.imageUrl3 : "img/not-available.jpg";
            ctrl.pickup.imageUrl.push(ctrl.imageUrl1, ctrl.imageUrl2, ctrl.imageUrl3);
            debugger;
            //ctrl.pickup.imageUrl = ctrl.imageUrl1.includes(", ") ? ctrl.imageUrl : "img/not-available.jpg";
            if (ctrl.itemImage.base64 || ctrl.itemImage2.base64 || ctrl.itemImage3.base64) {
                ctrl.pickup.imagesBase64 = [ctrl.itemImage.base64, ctrl.itemImage2.base64, ctrl.itemImage3.base64];
            } else {
                ctrl.pickup.imagesBase64 = [""];
            }
            ctrl.categoryArr = [];
            ctrl.pickedupItems.push(ctrl.pickup);
            debugger;
            ctrl.pickup = { "boolSharable": "No" };
            ctrl.subItemArr = [];
            ctrl.itemImage = '';
            ctrl.itemImage2 = '';
            ctrl.itemImage3 = '';
            ctrl.imageUrl = '';
            ctrl.pickup.imagesBase64 = '';
        };
        ctrl.updateCredit = function(item, index) {
            item.index = index;
            angular.bind(ctrl, openPopupCreditUpdate, angular.copy(item))();
        };
        ctrl.updateItemList = function(item) {
            ctrl.pickedupItems[data.item.index] = data.item;
        }

        ctrl.init();
    }

    angular.module('customerAddItemModal')
        .component('customerAddItemModal', {
            templateUrl: 'customers/customer-add-item-modal/customer-add-item-modal.template.html',
            controller: ['$state', '$scope', '$uibModal','Lightbox', 'customerUserService', 'UserRequestService', 'DriverService', customerAddItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
