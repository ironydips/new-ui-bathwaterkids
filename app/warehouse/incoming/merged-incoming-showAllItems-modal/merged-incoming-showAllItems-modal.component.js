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


    function MergeIncomingShowAllModal($state, $uibModal, warehouseMoveItems, ngToast, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.message = false;

        ctrl.init = function() {
            ctrl.getItemByStatus("INBOUND");
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.getItemByStatus = function(status) {
            warehouseMoveItems.getItemsByStatus(status)
                .then(function(response) {
                    if (angular.isArray(response.data)) {
                        ctrl.items = response.data;

                        for (var i = 0; i < ctrl.items.length; i++) {
                            if (ctrl.items[i].imageURLs.length == 0) {
                                ctrl.items[i].imageURLs[0] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
                            }
                        }
                    } else {
                        ctrl.items = [];
                        ctrl.message = true;
                    }
                })
                .catch(function(err) {
                    console.log('Error getting item status details:');
                    console.log(err);
                });
        };

        ctrl.receiveItem = function(storedItemId, location) {

            warehouseMoveItems.updateItemInWarehouse(storedItemId, location, "RECEIVED")
                .then(function(result) {

                    ctrl.getItemByStatus("INBOUND");
                    ngToast.create({
                        //className: 'success',
                        content: 'Item Moved to Received Items',
                        // dismissButton : true,
                        // horizontalPosition : 'center'
                    });

                })
                .catch(function(err) {
                    console.log('Error updating status & location of item in warehouse');
                    console.log(err);
                });

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };


        ctrl.init();
    }

    angular.module('mergeincomingShowAllModal')
        .component('mergeincomingShowAllModal', {
            templateUrl: 'warehouse/incoming/merged-incoming-showAllItems-modal/merged-incoming-showAllItems-modal.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItems', 'ngToast', 'Lightbox', MergeIncomingShowAllModal],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
