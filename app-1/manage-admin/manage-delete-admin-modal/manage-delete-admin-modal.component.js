(function(angular) {
    'use strict';

    function deleteAdminModalModalController($rootScope, $state) {
        var ctrl = this;
        ctrl.admin = (ctrl.resolve && ctrl.resolve.details) || {};


    ctrl.cancel = function(){
        ctrl.modalInstance.dismiss('cancelled');    
        };
    ctrl.deleteAdmin = function(){
        ctrl.modalInstance.close({action: 'delete', details: ctrl.admin});
    }
       
    }

    angular.module('deleteAdminModal')
        .component('deleteAdminModal', {
            templateUrl: 'manage-admin/manage-delete-admin-modal/manage-delete-admin-modal.template.html',
            controller: ['$rootScope', '$state', deleteAdminModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);