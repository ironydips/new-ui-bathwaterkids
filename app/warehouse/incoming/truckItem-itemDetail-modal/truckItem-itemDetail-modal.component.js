(function(angular) {
    'use strict';

    function openSubItemPopUp(details) {

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
                //if (data && data.action == "update");

            }),
            function(err) {
                console.log('Error in SubItem Modal in warehouseMoveItemService');
                console.log(err);
            }
    }

    function userDetailPopUp(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewUserDetailModal',
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
                //if (data && data.action == "update");

            }),
            function(err) {
                console.log('Error in user detail Modal of Incoming Warehouse');
                console.log(err);
            }
    }

    function ViewTruckItemModalController($state, $uibModal, ngToast, warehouseMoveItemService, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.requestedItems = (ctrl.resolve && ctrl.resolve.details) || {};
        console.log(ctrl.requestedItems)
        ctrl.userReq = [];
        ctrl.itemsArray = [];
        ctrl.imageURLs = [];
        ctrl.noItemMessage = true;


        ctrl.init = function() {


            ctrl.noUserReqMessage = true;
            ctrl.requestedItems.items.forEach(function(data) {
                data.isChecked = false;
                //Setting Signature URL data according to Lightbox Service for Image Display
                data.signatureURLArray = [];
                data.signatureURLArray.push({ "url": data.signatureURL });
            });
        };


        ctrl.getRequestedItems = function(item) {

            if (item.items) {
                if (item.isChecked) {

                    ctrl.noItemMessage = false;
                    for (var i = 0; i < item.items.length; i++) {
                        for (var j = 0; j <= i; j++) {
                            if (typeof item.items[i].imagesBase64[j] == "undefined") {
                                item.items[i].imagesBase64[j] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
                            }
                        }
                    }
                    item.items.forEach(function(data) {
                        data.userRequestID = item.userRequestID;
                        data.location = "noLocation";
                    });
                    ctrl.itemsArray = ctrl.itemsArray.concat(item.items);
                    ctrl.selectedRow = item.userRequestID;
                } else {
                    ctrl.itemsArray = ctrl.itemsArray.filter(function(data) {
                        return data.userRequestID != item.userRequestID
                    });
                    if (ctrl.itemsArray.length == 0) {
                        ctrl.noItemMessage = true;
                    }
                }

            } else {
                //No subitems in the array
                if (ctrl.itemsArray.length == 0) {

                    ctrl.noItemMessage = true;
                }
            }

        };
        ctrl.openLightboxModal = function(images, index) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.displayRow = function(index) {

            ctrl.displayRowValue = index;
            ctrl.selectedRow = "";
        };

        ctrl.receiveItem = function(storedItemId, location) {

            // warehouseMoveItemService.checkInStoredItem(storedItemId,"RECEIVED","2","as",12)
            //     .then(function(result) {

            //         debugger;
            //     })
            //     .catch(function(err) {
            //         console.log('Error updating status & location of item in warehouse');
            //         console.log(err);
            //     });

        };

        ctrl.subItems = function(subitem) {

            angular.bind(ctrl, openSubItemPopUp, subitem)();
        };

        ctrl.viewUserDetail = function(userDetail) {
            angular.bind(ctrl, userDetailPopUp, userDetail)();
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('viewTruckItemModal')
        .component('viewTruckItemModal', {
            templateUrl: 'warehouse/incoming/truckItem-itemDetail-modal/truckItem-itemDetail-modal.template.html',
            controller: ['$state', '$uibModal', 'ngToast', 'warehouseMoveItemService', 'Lightbox', ViewTruckItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
