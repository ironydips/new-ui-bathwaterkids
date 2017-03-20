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

    function OutboundItemModalController($state, $uibModal, warehouseMoveItems) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.message = false;

        ctrl.init = function() {
            warehouseMoveItems.getItemsByStatus("OUTBOUND")
                .then(function(response) {
                    if (response.data) {
                        ctrl.items = response.data;
                        if (ctrl.items.message) {
                            ctrl.message = true;
                        }
                        for (var i = 0; i < ctrl.items.length; i++) {
                            if (ctrl.items[i].imageURLs.length == 0) {
                                ctrl.items[i].imageURLs[0] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
                            }
                        }
                    }

                })
                .catch(function(err) {
                    console.log('Error getting outbound item  details:');
                    console.log(err);
                });
        };



        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.moreDetails = function(item) {
            angular.bind(ctrl, moreDetailsPopUp, angular.copy(item))();
        };

        ctrl.update = function(item) {

            if(item.itemCode != null){
                 warehouseMoveItems.updateDropItemStatus(item.storedItemId, item.location, "OUTBOUND", item.itemCode[0])
                .then(function(result) {
                    //ctrl.modalInstance.close({action: 'update'});
                })
                .catch(function(err) {
                    console.log('Error updating DROP ITEM STATUS in warehouse');
                    console.log(err);
                });
            }

           
        }

        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };

        ctrl.init();
    }

    angular.module('outboundProductModal')
        .component('outboundProductModal', {
            templateUrl: 'warehouse/warehouse-outgoing/outboundItem-modal/outboundItem-modal.template.html',
            controller: ['$state', '$uibModal', 'warehouseMoveItems', OutboundItemModalController],
            bindings: {
                modalInstance: '<'
            }
        });

})(window.angular)
