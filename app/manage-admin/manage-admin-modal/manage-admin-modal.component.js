(function(angular) {
    'use strict';

    function addAdminModalModalController($rootScope, $state, $http) {
        var ctrl = this;
        ctrl.admin = {};

        ctrl.isDisabled = Object.keys(ctrl.admin).length > 0;


        ctrl.saveAdmin = function() {
            ctrl.modalInstance.close('update');
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.checkAll = function(){
            ctrl.admin.SuperAdmin = ctrl.admin.Warehouse = ctrl.admin.Inventory = 
            ctrl.admin.Customers = ctrl.admin.Pickup = ctrl.admin.Admin = ctrl.admin.Owner = ctrl.admin.All;
      };
    }

    angular.module('addAdminModal')
        .component('addAdminModal', {
            templateUrl: 'manage-admin/manage-admin-modal/manage-admin-modal.template.html',
            controller: ['$rootScope', '$state', '$http', addAdminModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);