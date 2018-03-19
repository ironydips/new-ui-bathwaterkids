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
                if (data && data.action == 'updateSubitem') {
                    popUpCtrl.showUpdate = true;
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

    function customerAddItemModalController($state, $scope, $uibModal, Lightbox, customerUserService, UserRequestService, DriverService) {
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
        ctrl.txt = "Add";
        ctrl.disableCategory = false;


        ctrl.init = function() {
            ctrl.showUpdate = false;
            //if (ctrl.requestDetails.items && ctrl.requestDetails.items.length > 0) {
            if (ctrl.requestDetails.itemToEdit && ctrl.requestDetails.itemToEdit.sharable) {
                debugger;
                customerUserService.canChangeSharable(ctrl.requestDetails.itemToEdit.storedItemID)
                    .then(function(userlist) {
                        ctrl.loader = false;
                        if (userlist.data && !userlist.data.message) {
                            ctrl.editFunction();
                        }
                        if (userlist.data.message && userlist.data.statusCode == 103) {
                            debugger;
                            ctrl.disableCategory = true;
                            ctrl.editFunction();
                        }

                    })
                    .catch(function(err) {
                        console.log('Error getting user details:');
                        console.log(err);
                    });
            } else {
                ctrl.editFunction();
            }
            if (ctrl.requestDetails.items && ctrl.requestDetails.items.length > 0) {
                ctrl.editFunction();
            }

        };
        ctrl.editFunction = function() {
            if (ctrl.requestDetails.itemToEdit) {
                ctrl.addItem();
                ctrl.pickup = ctrl.requestDetails.itemToEdit;
                ctrl.pickup.productName = ctrl.requestDetails.itemToEdit.itemName;
                ctrl.pickup.itemCode = ctrl.requestDetails.itemToEdit.itemCodes && ctrl.requestDetails.itemToEdit.itemCodes.length > 0 ? ctrl.requestDetails.itemToEdit.itemCodes[0] : '';
                ctrl.pickup.newCredits = ctrl.requestDetails.itemToEdit.credits;
                ctrl.pickup.boolSharable = ctrl.requestDetails.itemToEdit.sharable ? 'Yes' : 'No';
                ctrl.showUpdate = true;

                if (ctrl.requestDetails.itemToEdit.subItems) {
                    ctrl.showUpdate = true;
                    ctrl.viewItems = false;
                    //    ctrl.txt = "Edit"; 
                }
                if (ctrl.requestDetails.itemToEdit.sharable) {
                    ctrl.categories = ctrl.requestDetails.itemToEdit.parentCategoryID;
                    ctrl.setCategory(ctrl.requestDetails.itemToEdit.parentCategoryID);
                    ctrl.pickup.boolSharable = 'Yes';
                }


                if (ctrl.requestDetails.itemToEdit.imageUrl && ctrl.requestDetails.itemToEdit.imageUrl.length > 0) {
                    if (ctrl.requestDetails.itemToEdit.imageUrl[0]) ctrl.imageUrl1 = ctrl.requestDetails.itemToEdit.imageUrl[0];
                    if (ctrl.requestDetails.itemToEdit.imageUrl[1]) ctrl.imageUrl2 = ctrl.requestDetails.itemToEdit.imageUrl[1];
                    if (ctrl.requestDetails.itemToEdit.imageUrl[2]) ctrl.imageUrl3 = ctrl.requestDetails.itemToEdit.imageUrl[2];
                }
                if (ctrl.requestDetails.itemToEdit.subItems && ctrl.requestDetails.itemToEdit.subItems.length > 0) {
                    ctrl.viewItems = false;
                    ctrl.showUpdate = true;
                }
                debugger;
            }
        }
        ctrl.setCategory = function(category) {
            ctrl.loader = true;
            ctrl.pickup.parentCategoryID = category;
            customerUserService.getCategories(category)
                .then(function(userlist) {
                    ctrl.loader = false;
                    if (userlist && userlist.data) {
                        ctrl.message = false;
                        ctrl.categoryArr = userlist.data;
                        if (ctrl.requestDetails.itemToEdit) {
                            var val = ctrl.categoryArr.filter(function(data) {
                                if (ctrl.requestDetails.itemToEdit.categoryID == data.categoryID) {
                                    return data;
                                }
                            });
                            ctrl.subCategory = val[0];
                        }
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
        ctrl.imageUpload = function(imageBase64, txt) {
            ctrl.loader = true;
            customerUserService.saveImage(imageBase64)
                .then(function(result) {
                    ctrl.loader = false;
                    if (result && result.data && result.data.statusCode == 200) {
                        switch (txt) {
                            case 'firstImage':
                                ctrl.imageUrl1 = result.data.imageUrl;
                                if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[0]) {
                                    ctrl.pickup.imageUrl[0] = result.data.imageUrl;
                                }
                                break;
                            case 'secondImage':
                                ctrl.imageUrl2 = result.data.imageUrl;
                                if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[1]) {
                                    ctrl.pickup.imageUrl[1] = result.data.imageUrl;
                                }
                                break;
                            case 'thirdImage':
                                ctrl.imageUrl3 = result.data.imageUrl;
                                if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[2]) {
                                    ctrl.pickup.imageUrl[2] = result.data.imageUrl;
                                }
                                break;

                        }
                    }
                })
                .catch(function(err) {
                    console.log('Error while Image Upload');
                    console.log(err);
                });
        }
        ctrl.updateSubitem = function(subItem) {
            if (subItem.imageUrl && subItem.imageUrl.length == 0) { subItem.imageUrl[0] = "img/not-available.jpg"; };
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
            if (ctrl.requestDetails.itemToEdit) {
                debugger;
                ctrl.requestDetails.subItems = ctrl.requestDetails.itemToEdit.subItems;
            }
            angular.bind(ctrl, openSubItem, ctrl.requestDetails.subItems)();
        };

        ctrl.submitItems = function() {
            ctrl.pickedupItemsArr = [];

            for (var i = 0; i < ctrl.pickedupItems.length; i++) {
                ctrl.selectedItemObj = { subItems: [] };

                ctrl.selectedItemObj.productName = ctrl.pickedupItems[i].productName;
                ctrl.selectedItemObj.brandName = ctrl.pickedupItems[i].brandName;
                ctrl.selectedItemObj.condition = ctrl.pickedupItems[i].condition;
                ctrl.selectedItemObj.eventualDamages = ctrl.pickedupItems[i].eventualDamages;
                ctrl.selectedItemObj.itemCodes = ctrl.pickedupItems[i].itemCodes;
                ctrl.selectedItemObj.imageUrl = ctrl.pickedupItems[i].imageUrl;
                ctrl.selectedItemObj.parentCategoryID = ctrl.pickedupItems[i].parentCategoryID;
                ctrl.selectedItemObj.categoryID = ctrl.pickedupItems[i].categoryID;
                ctrl.selectedItemObj.categoryName = ctrl.pickedupItems[i].categoryName;
                ctrl.selectedItemObj.sharable = ctrl.pickedupItems[i].sharable;
                ctrl.selectedItemObj.location = ctrl.pickedupItems[i].location;
                ctrl.selectedItemObj.newCredits = ctrl.pickedupItems[i].newCredits;
                for (var j = 0; j < ctrl.pickedupItems[i].subItems.length; j++) {
                    ctrl.subItemObj = {};
                    ctrl.subItemObj.description = ctrl.pickedupItems[i].subItems[j].description;
                    ctrl.subItemObj.imageUrl = ctrl.pickedupItems[i].subItems[j].imageUrl;
                    ctrl.subItemObj.itemName = ctrl.pickedupItems[i].subItems[j].itemName;
                    ctrl.subItemObj.itemCode = ctrl.pickedupItems[i].subItems[j].itemCode;
                    ctrl.selectedItemObj.subItems.push(ctrl.subItemObj);
                }

                ctrl.pickedupItemsArr.push(ctrl.selectedItemObj);
            }
            debugger;
            ctrl.data = {
                "userRequestID": ctrl.requestDetails.userRequestID,
                "pickedupItems": ctrl.pickedupItemsArr,
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
            var imagArr = images.filter(function(data) {
                if (data) return data;
            });
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(imagArr, 0);
        };
        ctrl.addItem = function() {
            ctrl.viewItems = false;
            ctrl.showtable = false;
            ctrl.itemImage = '';
            ctrl.itemImage2 = '';
            ctrl.itemImage3 = '';
            ctrl.imageUrl1 = '';
            ctrl.imageUrl2 = '';
            ctrl.imageUrl3 = '';
            ctrl.categories = '';
            ctrl.subCategory = '';
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
            //ctrl.pickup.newCredits = ctrl.pickup.newCredits || 0;
            ctrl.pickup.subItems = ctrl.subItemArr;
            ctrl.pickup.sharable = ctrl.pickup.boolSharable == 'Yes' ? 1 : 0;
            ctrl.pickup.itemCodes = [ctrl.pickup.itemCode];
            // ctrl.imageUrl1 = ctrl.imageUrl1.includes(", ") ? ctrl.imageUrl1 : "img/not-available.jpg";
            // ctrl.imageUrl2 = ctrl.imageUrl2.includes(", ") ? ctrl.imageUrl2 : "img/not-available.jpg";
            // ctrl.imageUrl3 = ctrl.imageUrl3.includes(", ") ? ctrl.imageUrl3 : "img/not-available.jpg";
            if (ctrl.imageUrl1 || ctrl.imageUrl2 || ctrl.imageUrl3) {
                ctrl.pickup.imageUrl.push(ctrl.imageUrl1, ctrl.imageUrl2, ctrl.imageUrl3);
            } else {
                ctrl.pickup.imageUrl = ["img/not-available.jpg"];
            }
            if(ctrl.pickup.imageUrl && ctrl.pickup.imageUrl.length > 0 && ctrl.pickup.imageUrl[0] == ""){
                ctrl.pickup.imageUrl[0] = "img/not-available.jpg";
            }
            //ctrl.pickup.imageUrl = ctrl.imageUrl1.includes(", ") ? ctrl.imageUrl : "img/not-available.jpg";
            // if (ctrl.itemImage.base64 || ctrl.itemImage2.base64 || ctrl.itemImage3.base64) {
            //     ctrl.pickup.imagesBase64 = [ctrl.itemImage.base64, ctrl.itemImage2.base64, ctrl.itemImage3.base64];
            // } else {
            //     ctrl.pickup.imagesBase64 = [""];
            // }
            ctrl.categoryArr = [];
            debugger;
            ctrl.pickedupItems.push(ctrl.pickup);
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
        ctrl.editItemObj = function() {
            ctrl.loader = true;
            var obj = { subItems: [] };
            obj.userRequestID = ctrl.requestDetails.userRequestID;
            obj.storedItemID = ctrl.pickup.storedItemID;
            obj.productName = ctrl.pickup.productName;
            obj.brandName = ctrl.pickup.brandName;
            obj.condition = ctrl.pickup.condition;
            obj.eventualDamages = ctrl.pickup.eventualDamages;
            obj.itemCodes = [ctrl.pickup.itemCode];
            // if (ctrl.imageUrl1 || ctrl.imageUrl2 || ctrl.imageUrl3) {
            //     ctrl.pickup.imageUrl.push(ctrl.imageUrl1, ctrl.imageUrl2, ctrl.imageUrl3);
            // } 
            obj.imagesUrl = ctrl.pickup.imageUrl;

            obj.sharable = ctrl.pickup.boolSharable == 'Yes' ? 1 : 0;
            if (obj.sharable) {
                obj.parentCategoryID = ctrl.categories;
                obj.categoryID = ctrl.pickup.categoryID;
                obj.categoryName = ctrl.pickup.categoryName;
            }
            obj.location = ctrl.pickup.location;
            obj.newCredits = ctrl.pickup.newCredits;
            // for (var j = 0; j < ctrl.pickup.subItems.length; j++) {
            //     ctrl.subItemSelectedObj = {};
            //     ctrl.subItemSelectedObj.description = ctrl.subItemArr[j].description;
            //     ctrl.subItemSelectedObj.imagesUrl = ctrl.subItemArr[j].imageUrl;
            //     ctrl.subItemSelectedObj.itemName = ctrl.subItemArr[j].itemName;
            //     ctrl.subItemSelectedObj.itemCode = ctrl.subItemArr[j].itemCode;
            //     debugger;
            //     obj.subItems.push(ctrl.subItemSelectedObj);
            // }
            obj.subItems = ctrl.pickup.subItems;
            debugger;
            customerUserService.editUserItem(obj)
                .then(function(userlist) {
                    ctrl.loader = false;
                    if (userlist && userlist.data) {
                        debugger;
                        ctrl.modalInstance.close({ action: 'update' });
                    } else {
                        ctrl.message = true;
                    }
                })
                .catch(function(err) {
                    console.log('Error getting user details:');
                    console.log(err);
                });
        };
        ctrl.removeImage = function(txt) {
            switch (txt) {
                case 'first':
                    ctrl.imageUrl1 = '';
                    ctrl.itemImage = '';
                    if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[0]) {
                        ctrl.pickup.imageUrl[0] = '';
                    }
                    break;
                case 'second':
                    ctrl.imageUrl2 = '';
                    ctrl.itemImage2 = '';
                    if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[0]) {
                        ctrl.pickup.imageUrl[1] = '';
                    }
                    break;
                case 'third':
                    ctrl.imageUrl3 = '';
                    ctrl.itemImage3 = '';
                    if (ctrl.requestDetails.itemToEdit && ctrl.pickup.imageUrl || ctrl.pickup.imageUrl[0]) {
                        ctrl.pickup.imageUrl[2] = '';
                    }
                    break;

            }
            debugger;
        }

        ctrl.init();
    }

    angular.module('customerAddItemModal')
        .component('customerAddItemModal', {
            templateUrl: 'customers/customer-add-item-modal/customer-add-item-modal.template.html',
            controller: ['$state', '$scope', '$uibModal', 'Lightbox', 'customerUserService', 'UserRequestService', 'DriverService', customerAddItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
