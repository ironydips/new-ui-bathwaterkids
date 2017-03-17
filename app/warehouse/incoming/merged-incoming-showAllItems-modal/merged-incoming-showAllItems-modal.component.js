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

    // function subItemsPopup(details) {

    //     var popUpCtrl = this;
    //     var modalInstance = popUpCtrl.$uibModal.open({
    //         component: 'subitemsModal',
    //         windowClass: 'app-modal-window-large',
    //         resolve: {
    //             details: function() {
    //                 return (details || {});
    //             }
    //         },
    //         keyboard: false,
    //         backdrop: 'static'
    //     });

    //     modalInstance.result.then(function(data) {
    //             //data passed when pop up closed.


    //         }),
    //         function(err) {
    //             console.log('Error in sub items Modal');
    //             console.log(err);
    //         }

    // }

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


    function MergeIncomingShowAllModal($state, $uibModal, warehouseMoveItems, Lightbox) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.enableRecBtn = true;
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

        // ctrl.subItems = function(subitem) {
        //     angular.bind(ctrl, subItemsPopup, subitem)();
        // };

        ctrl.updateLocStatus = function(item) {
            angular.bind(ctrl, updateLocStatusPopup, angular.copy(item))();
        };

        
        ctrl.openLightboxModal = function (images) {
        //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.getItemByStatus = function(status) {
            warehouseMoveItems.getItemsByStatus(status)
                .then(function(response) {
                    if(response.data){
                        ctrl.items = response.data;
                    
                        for (var i = 0; i < ctrl.items.length; i++) {
                            if(ctrl.items[i].imageURLs.length == 0){
                                ctrl.items[i].imageURLs[0] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
                            }
                        }
                    }
                    
                })
                .catch(function(err) {
                    console.log('Error getting item status details:');
                    console.log(err);
                });
        };

        ctrl.receiveItem = function(index){
            ctrl.enableRecBtn = false;
            
        };

        ctrl.save = function(){
            ctrl.modalInstance.close();
        }


        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };


        ctrl.init();
    }

    angular.module('mergeincomingShowAllModal')
        .component('mergeincomingShowAllModal', {
            templateUrl: 'warehouse/incoming/merged-incoming-showAllItems-modal/merged-incoming-showAllItems-modal.template.html',
            controller: ['$state','$uibModal', 'warehouseMoveItems','Lightbox', MergeIncomingShowAllModal],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
