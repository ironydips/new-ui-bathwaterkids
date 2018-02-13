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
                //if (data && data.action == "update");

            }),
            function(err) {
                console.log('Error in SubItem Modal');
                console.log(err);
            }
    }

    function userReqModalController($state, $uibModal, customerUserService, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
        ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
        ctrl.userReq = [];
        ctrl.itemsArray = [];
        ctrl.imageURLs = [];
        //ctrl.itemSelected = false;

        ctrl.UserReqmessage = true;
        ctrl.noItemMessage = true;
        ctrl.showAddButton = false;



        ctrl.init = function() {
            ctrl.noUserReqMessage = true;
            ctrl.loader = true;
            ctrl.getRequest();
        };

        ctrl.getRequest = function (argument) {
            customerUserService.getUserRequest(ctrl.customer.userID)
                .then(function(response) {
                    ctrl.loader = false;

                    if (response && response.data.length > 0) {

                        response.data.forEach(function(data) {
                            data.isChecked = false;
                            //if(ctrl.selectedItem){

                                // if(ctrl.selectedItem && ctrl.isChecked(data.userRequestID)){
                                //     data.isChecked = true;
                                // }
                            //}
                        });

                        ctrl.userReq = response.data; //uncheck
                        ctrl.UserReqmessage = false;
                        if(ctrl.selectedItem){
                            ctrl.isChecked(ctrl.selectedItem.userRequestID);
                            // ctrl.getItems(ctrl.selectedItem);
                        }
                    } else {
                        ctrl.message = true;
                        ctrl.itemsMessage = "Data does not exist";
                    }
                })
                .catch(function(err) {
                    console.log('Error getting user-request details:');
                    console.log(err);
                });
        }

        ctrl.isChecked = function(userRequestID){
            ctrl.userReq.forEach(function(data) {
                if(data.userRequestID == userRequestID){
                    data.isChecked = true;
                    ctrl.getItems(data);
                }
                            
                        });
            // var boolean = false;
            // if(userRequestID == ctrl.selectedItem.userRequestID){
            //     boolean = true;
            // }
            //   return boolean;
        }

        ctrl.getItems = function(item) {
            ctrl.selectedRow = item.userRequestID;
            ctrl.selectedItem = item;
            if (item.items) {
                // if (item.isChecked) {
                    ctrl.noItemMessage = false;
                    ctrl.noUserReqMessage = false;
                    for (var i = 0; i < item.items.length; i++) {
                        for (var j = 0; j <= i; j++) {
                            if(item.items[i].hasOwnProperty('imageUrl') && item.items[i].imageUrl.length ){
                                 item.items[i].imageUrl = item.items[i].imageUrl;
                            }else{
                                let arr = ["img/not-available.jpg"];
                                item.items[i].imageUrl = arr;
                            }
                             // if(item.items[i].hasOwnProperty('imageUrl')){
                             //     item.items[i].imageUrl = item.items[i].imageUrl;
                             // }
                            // // if (item.items[i].imagesBase64 && typeof item.items[i].imagesBase64[j] == "undefined") {
                            // if (item.items[i].hasOwnProperty('imageUrl') && item.items[i].imageUrl[i]==null) {
                            //     //ctrl.value = item.items[i].imagesBase64[j];
                            //     item.items[i].imageUrl[j] = "img/not-available.jpg";
                            // }
                            // if(!item.items[i].hasOwnProperty('imagesBase64')){
                            //     let arr = ["img/not-available.jpg"];
                            //     item.items[i].imagesBase64 = arr;
                            //     //let arr = [];
                            // }
                            // // if (item.items[i].imagesBase64 && typeof item.items[i].imagesBase64[j] == "undefined") {
                            // if (item.items[i].imagesBase64[i]==null) {
                            //     //ctrl.value = item.items[i].imagesBase64[j];
                            //     item.items[i].imagesBase64[j] = "img/not-available.jpg";
                            // }
                        }
                    }
                    item.items.forEach(function(data) { data.userRequestID = item.userRequestID });
                    ctrl.itemsArray = [];
                    // ctrl.itemsArray = ctrl.itemsArray.concat(item.items);
                    ctrl.itemsArray = item.items;
                    // ctrl.selectedRow = item.userRequestID;
                // } else {
                //     ctrl.itemsArray = ctrl.itemsArray.filter(function(data) {
                //         return data.userRequestID != item.userRequestID });
                //     if (ctrl.itemsArray.length == 0) {
                //         ctrl.noItemMessage = true;
                //     }
                // }
            } else {
                //No subitems in the array
                ctrl.itemsArray = [];
                // if (ctrl.itemsArray.length == 0) {
                ctrl.noItemMessage = true;
                if(ctrl.selectedItem.status!="cancelled"){
                    ctrl.showAddButton = true;
                }
                // }
            }

        };
        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };

        ctrl.displayRow = function(index) {
            ctrl.displayRowValue = index;
            ctrl.selectedRow = "";
        };

        ctrl.subItems = function(subitem) {
            angular.bind(ctrl, openSubItem, subitem)();
        };

        ctrl.addItems = function() {
            // console.log(userRequestID)
            angular.bind(ctrl, openPopUpAddItem, ctrl.selectedItem)();
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };


        function openPopUpAddItem(details) {
            var popUpCtrl = this;
            var modalInstance = popUpCtrl.$uibModal.open({
                component: 'customerAddItemModal',
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
                    // ctrl.init();
                    //userRequestID 
                    ctrl.getRequest();
                }),
                function(err) {
                    console.log('Error in user-request-completed Modal');
                    console.log(err);
                }
        };

        ctrl.init();
    }

    angular.module('customerUserReqModal')
        .component('customerUserReqModal', {
            templateUrl: 'customers/customer-userRequest-modal/customer-userRequest-modal.template.html',
            controller: ['$state', '$uibModal', 'customerUserService', 'Lightbox', userReqModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
