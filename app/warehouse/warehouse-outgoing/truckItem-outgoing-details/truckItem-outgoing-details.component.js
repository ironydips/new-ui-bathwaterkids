(function(angular) {

    'use strict';

    function driverInfoPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'driverInfoModal',
            windowClass: 'app-modal-window-small',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in driver-Info Modal');
                console.log(err);
            }

    }

    function viewItemPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewTruckItemModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view item Modal');
                console.log(err);
            }

    }

    function receiveincomingProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'receiveincomingProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view product Modal');
                console.log(err);
            }

    }

    function storedProductPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'storedProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.


            }),
            function(err) {
                console.log('Error in view product Modal');
                console.log(err);
            }

    }


    function TruckItemOutgoingController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.dropItemArray = [];

        ctrl.init = function() {

        };

        ctrl.viewReceivedItems = function() {
            angular.bind(ctrl, receiveincomingProductPopup, null)();
        };

        ctrl.viewStoredItems = function() {
            angular.bind(ctrl, storedProductPopup, null)();
        };

        ctrl.viewItems = function(item) {
            angular.bind(ctrl, viewItemPopup, item)();
        };

        ctrl.viewDriverDetail = function(driverInfo) {
            angular.bind(ctrl, driverInfoPopup, driverInfo)();
        }

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.selectedDate = function(date) {

            // warehouseMoveItemService.outgoingItems(date)
            //     .then(function(response) {
            //         console.log(response)
            //     })
            //     .catch(function(err) {
            //         console.log('Error getting outgoing item status details:');
            //         console.log(err);
            //     });
            warehouseMoveItemService.incomingItems(date)
                .then(function(response) {
                    // console.log(response)
                    ctrl.dropOffItems = response.data;
                    ctrl.filteredDropItems = ctrl.dropOffItems.filter(function(data){

                         data.items.filter(function(subData){
                            return subData.type == "drop off";
                         });

                         return data;
                    });
                     console.log(ctrl.filteredDropItems)
                    // if (ctrl.filteredDropItems) {
                    //     for (var i = 0; i < ctrl.filteredDropItems.length; i++) {
                    //         for (var j = 0; j <= i; j++) {
                    //             for (var z = 0; z < j; z++) {
                    //                 ctrl.dropRequestedItems = ctrl.filteredDropItems[i].items[j];

                    //                 ctrl.dropItemArray.push(ctrl.dropRequestedItems);
                    //                 console.log(ctrl.dropRequestedItems)
                    //             }


                    //         }
                    //     }
                    // }else{

                    // }

                })
                .catch(function(err) {
                    console.log('Error getting outgoing item status details:');
                    console.log(err);
                });

        }

        ctrl.init();
    }

    angular.module('truckItemOutgoingWarehouseDetails')
        .component('truckItemOutgoingWarehouseDetails', {
            templateUrl: 'warehouse/warehouse-outgoing/truckItem-outgoing-details/truckItem-outgoing-details.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService', TruckItemOutgoingController]
        });
})(window.angular);
