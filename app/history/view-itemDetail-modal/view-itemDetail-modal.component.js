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
            }),
            function(err) {
                console.log('Error in SubItem Modal');
                console.log(err);
            }
    }

    function ViewItemDetailModalController($state, $uibModal,Lightbox, inventoryService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;

        ctrl.init = function() {
            ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
            for (var i = 0; i < ctrl.item.length; i++) {
                for (var j = 0; j <= i; j++) {
                    if (ctrl.item[i].hasOwnProperty('imageUrl') && ctrl.item[i].imageUrl.length > 0) {
                        ctrl.item[i].imageUrl = ctrl.item[i].imageUrl;
                    } else {
                        let arr = ["img/not-available.jpg"];
                        ctrl.item[i].imageUrl = arr;
                    }
                }
            }
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.subItems = function(subitem) {
            angular.bind(ctrl, openSubItem, subitem)();
        }

        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.init();
    }

    angular.module('viewItemDetailModal')
        .component('viewItemDetailModal', {
            templateUrl: 'history/view-itemDetail-modal/view-itemDetail-modal.template.html',
            controller: ['$state', '$uibModal','Lightbox', 'inventoryService', ViewItemDetailModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
