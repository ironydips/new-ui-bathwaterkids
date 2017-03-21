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

    function viewOutboundPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'outboundProductModal',
            windowClass: 'app-modal-window-large',
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            keyboard: false,
            backdrop: 'static'
        });

    }



    function proceedToOutboundPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'outgoingAssignTruckModal',
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
                if (data && data.action == 'update') {
                    popUpCtrl.ngToast.create({
                        content: 'Item Moved to Outbound Items',
                    });
                    popUpCtrl.init();
                }


            }),
            function(err) {
                console.log('Error in update location and status Modal');
                console.log(err);
            }

    }


    function newOutgoingController($state, $uibModal,ngToast, warehouseMoveItems, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.ngToast = ngToast;
        ctrl.message = false;

        ctrl.init = function() {
            ctrl.getItemByStatus("REQUESTED_DROPFF");
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.proceed = function(item) {
            angular.bind(ctrl, proceedToOutboundPopup, angular.copy(item))();
        };

        ctrl.viewOutboundItems = function() {
            angular.bind(ctrl, viewOutboundPopup, null)();
        }


        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.getItemByStatus = function(status) {
            warehouseMoveItems.getItemsByStatus(status)
                .then(function(response) {
                    if (angular.isArray(response.data)) {
                        ctrl.items = response.data;
                        ctrl.items.status = "REQUESTED_DROPFF";

                        for (var i = 0; i < ctrl.items.length; i++) {
                            if (ctrl.items[i].imageURLs.length == 0) {
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
        };

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };


        ctrl.init();
    }

    angular.module('newOutgoingWarehouseDetails')
        .component('newOutgoingWarehouseDetails', {
            templateUrl: 'warehouse/warehouse-outgoing/new-outgoing-details/new-outgoing-details.template.html',
            controller: ['$state', '$uibModal','ngToast', 'warehouseMoveItems', 'Lightbox', newOutgoingController]
        });
})(window.angular);
