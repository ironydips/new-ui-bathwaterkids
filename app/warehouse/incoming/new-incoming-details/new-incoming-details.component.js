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
                console.log('Error in more details Modal');
                console.log(err);
            }

    }


    function updateLocStatusPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'updateLocStatusModal',
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
                if(data && data.action == 'update') popUpCtrl.init();


            }),
            function(err) {
                console.log('Error in update location and status Modal');
                console.log(err);
            }

    }


    function newIncomingController($state, $uibModal, warehouseMoveItemService, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.item = {
            "status": "INBOUND",
            "allStatus": ["INBOUND", "OUTBOUND", "STORED", "RECEIVED","REQUESTED_DROPFF"]
        };

        ctrl.init = function() {
            ctrl.getItemByStatus("INBOUND");
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.updateLocStatus = function(item) {
            angular.bind(ctrl, updateLocStatusPopup, angular.copy(item))();
        };

        
        ctrl.openLightboxModal = function (images) {
        //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.getItemByStatus = function(status) {
            
            warehouseMoveItemService.getItemsByStatus(status)
                .then(function(response) {
                    if(angular.isArray(response.data)){
                        ctrl.items = response.data;
                        ctrl.message = false;
                        
                        for (var i = 0; i < ctrl.items.length; i++) {
                            if(ctrl.items[i].imageURLs.length == 0){
                                ctrl.items[i].imageURLs[0] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
                            }
                        }
                    }else{
                        ctrl.items = [];
                        ctrl.message = true;
                    }
                    
                })
                .catch(function(err) {
                    console.log('Error getting item status details:');
                    console.log(err);
                });
        }


        ctrl.init();
    }

    angular.module('newIncomingWarehouseDetails')
        .component('newIncomingWarehouseDetails', {
            templateUrl: 'warehouse/incoming/new-incoming-details/new-incoming-details.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItemService','Lightbox', newIncomingController]
        });
})(window.angular);
