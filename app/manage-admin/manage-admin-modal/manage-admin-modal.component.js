(function(angular) {
    'use strict';

    function addAdminModalModalController($rootScope, $state, $http) {
        var ctrl = this;
        ctrl.admin = {};

        ctrl.isDisabled = Object.keys(ctrl.admin).length > 0;


        ctrl.saveAdmin = function() {

            // adminArrayService.addadmin(ctrl.admin);

            ctrl.modalInstance.close('update');

        }


        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        }
        ctrl.selectAll = function(){
        	if(ctrl.admin.All == true){
        		ctrl.admin.Owner = true;
        ctrl.admin.Admin = true;
        ctrl.admin.Pickup = true;
        ctrl.admin.Customers = true;
        ctrl.admin.Inventory = true;
        ctrl.admin.Warehouse = true;
        ctrl.admin.SuperAdmin = true;
    }else{
    	ctrl.admin.Owner = false;
        ctrl.admin.Admin = false;
        ctrl.admin.Pickup = false;
        ctrl.admin.Customers = false;
        ctrl.admin.Inventory = false;
        ctrl.admin.Warehouse = false;
        ctrl.admin.SuperAdmin = false;
    }
        	

        
       
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