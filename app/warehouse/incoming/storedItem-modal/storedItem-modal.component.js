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

    function StoredItemModalController($state, $uibModal, ngToast, warehouseMoveItems) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.message = false;

        ctrl.init = function() {
            warehouseMoveItems.getItemsByStatus("STORED")
                .then(function(response) {
                    if (angular.isArray(response.data)) {
                        ctrl.items = response.data;
                        
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
                    console.log('Error getting stored item  details:');
                    console.log(err);
                });
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.requestDropOff = function(storedItemId, location) {

            warehouseMoveItems.updateItemInWarehouse(storedItemId, location, "REQUESTED_DROPFF")
                .then(function(result) {
                    ctrl.init();
                    ngToast.create({
                       // className: 'success',
                        content: 'Item Moved to REQUESTED_DROPFF',
                        //dismissButton: true
                    });
                })
                .catch(function(err) {
                    console.log('Error while requestDropOff of item in warehouse');
                    console.log(err);
                });

        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('storedProductModal')
        .component('storedProductModal', {
            templateUrl: 'warehouse/incoming/storedItem-modal/storedItem-modal.template.html',
            controller: ['$state', '$uibModal','ngToast', 'warehouseMoveItems', StoredItemModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
