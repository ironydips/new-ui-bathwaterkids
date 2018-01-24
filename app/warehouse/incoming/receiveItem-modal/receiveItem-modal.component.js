(function(angular) {
    'use strict';

    function moreDetailsPopUp(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'moreDetailsModal',
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
                console.log('Error in more details of item Modal');
                console.log(err);
            }

    }

    function updateLocPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'updateLocStoredModal',
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
                if (data && data.action == 'update') popUpCtrl.init();


            }),
            function(err) {
                console.log('Error in update location of received items Modal');
                console.log(err);
            }

    }

    function ReceiveItemModalController($state, $uibModal, warehouseMoveItemService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.message = false;

        ctrl.init = function() {
            ctrl.loader = true;
            warehouseMoveItemService.getItemsByStatus("RECEIVED")
                .then(function(response) {
                    ctrl.loader = false;
                    if (angular.isArray(response.data)) {
                        ctrl.items = response.data;
                        for (var i = 0; i < ctrl.items.length; i++) {
                            if(ctrl.items[i].imageURLs == null ){
                                var arr = [];
                                arr[0] = 'img/not-available.jpg';
                                ctrl.items[i].imageURLs = arr;
                            }else if (ctrl.items[i].imageURLs.length == 0) {
                                ctrl.items[i].imageURLs[0] = "img/not-available.jpg";
                            } 
                        }
                    }else{
                        ctrl.items =[];
                        ctrl.message = true;
                    }

                })
                .catch(function(err) {
                    console.log('Error getting received item status details:');
                    console.log(err);
                });
        };

        ctrl.updateLocation = function(item) {

            angular.bind(ctrl, updateLocPopup, angular.copy(item))();
            
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('receiveincomingProductModal')
        .component('receiveincomingProductModal', {
            templateUrl: 'warehouse/incoming/receiveItem-modal/receiveItem-modal.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService', ReceiveItemModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
