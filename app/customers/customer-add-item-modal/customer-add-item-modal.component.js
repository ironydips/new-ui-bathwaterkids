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
                if (data && data.action == "update"){
                    popUpCtrl.updateSubitem(data.subItem);
                }

            }),
            function(err) {
                console.log('Error in SubItem Modal');
                console.log(err);
            }
    }

    function customerAddItemModalController($state,$uibModal, UserRequestService, DriverService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.subItemArr = [];
        ctrl.requestDetails = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.pickup = { "sharable": "No"};
        ctrl.pickedupItems = [];
        ctrl.isSubItem = false;
        ctrl.viewItems = true;
        ctrl.showtable = false;

        ctrl.init = function() {

        };

        ctrl.updateSubitem = function(subItem){
            ctrl.subItemArr.push(subItem);

        }
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }

        ctrl.addSubItem = function() {
            ctrl.isSubItem = true;

        }
        ctrl.opensubItemModal = function(subitem){
            debugger;
            angular.bind(ctrl, openSubItem, subitem)();
        }
        ctrl.subItems = function() {
            angular.bind(ctrl, openSubItem, ctrl.requestDetails.subItems)();
        };

        ctrl.done = function() {
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
                    console.log('Error Adding Driver');
                    console.log(err);
                });
            ctrl.viewItems = false;
        }
        ctrl.addItem = function(){
            ctrl.viewItems = false;
            ctrl.showtable = false;
        }

        ctrl.save = function() {
            ctrl.viewItems = true;
            ctrl.showtable = true;
            ctrl.pickup.subItems = ctrl.subItemArr;
            //ctrl.pickup.userRequestID = ctrl.requestDetails.userRequestID;
            ctrl.pickedupItems.push(ctrl.pickup);
            ctrl.pickup = {};
            ctrl.subItemArr = [];
            ctrl.pickup = { "sharable": "No"};
            // ctrl.pickup.driverID = ctrl.requestDetails.driver.driverID;

            // ctrl.data = {
            //     "userRequestID": ctrl.requestDetails.userRequestID,
            //     // "driverID": ctrl.requestDetails.driver.driverID,
            //     "pickedupItems": [
            //     {
            //         "itemCode": [
            //                 ctrl.itemCode
            //             ],
            //         "productName": ctrl.productName,
            //         "brandName": ctrl.brandName,
            //         "condition": ctrl.condition,
            //         "eventualDamages": ctrl.eventualDamages,
            //         "sharable": ctrl.sharable,
            //         "imagesBase64": [
            //                 ctrl.file1
            //             ],
            //         "subItems": [
            //                 {
            //                     "itemCode": "753",
            //                     "itemName": "abc",
            //                     "description": "sample"
            //                 }
            //             ]
            //         }
            //     ],
            //     "bins": [
            //             {
            //                 "binCode": '142',
            //                 "imageBase64": ctrl.file2
            //             }
            //         ],
            //     "customerSignatureBase64": ctrl.file3
            // };
            // ctrl.loader = true;
            // DriverService.pickup(ctrl.data)
            //     .then(function(result) {
            //         ctrl.loader = false;
            //         ctrl.modalInstance.close({ action: 'update' });
            //     })
            //     .catch(function(err) {
            //         console.log('Error Adding Driver');
            //         console.log(err);
            //     });
        };

        ctrl.init();
    }

    angular.module('customerAddItemModal')
        .component('customerAddItemModal', {
            templateUrl: 'customers/customer-add-item-modal/customer-add-item-modal.template.html',
            controller: ['$state','$uibModal', 'UserRequestService', 'DriverService', customerAddItemModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
