(function(angular) {
    'use strict';

    function addAdminModalModalController($rootScope, $state, $http, AdminRightsService) {
        var ctrl = this;
        ctrl.admin = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.isDisabled = Object.keys(ctrl.admin).length > 0;
        ctrl.isEdited = Object.keys(ctrl.admin).length > 0;
        ctrl.key = $state.params.key;
        
       
        ctrl.saveAdmin = function() {
            var roleValue = 0;
            if(ctrl.admin.SuperAdmin) roleValue += 100;
            if(ctrl.admin.Admin) roleValue += 16;
            if(ctrl.admin.Warehouse) roleValue += 8;
            if(ctrl.admin.Inventory) roleValue += 4;
            if(ctrl.admin.Customers) roleValue += 2;
            if(ctrl.admin.Pickup) roleValue += 1;


            var params = JSON.stringify({
                          email: ctrl.admin.email,
                          name: ctrl.admin.username,
                          role: roleValue.toString()
                      });
            $http({
                    url: '/rest/admin/addAdmin',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": ctrl.key
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.modalInstance.close({action: 'update'});
                        // ctrl.modalInstance.close({action: 'add', details: ctrl.admin});
                    }
                })
                .catch(function(err) {
                    console.log('Error getting Admin lists:');
                    console.log(err);
                })
        };

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        switch(ctrl.admin.role){
            case "0":
                ctrl.admin.Pickup = true;
                break;
            case "1":
                ctrl.admin.Customers = true;
                break;
            case "2":
                ctrl.admin.Inventory = true;
                break;
            case "3":
                ctrl.admin.Warehouse = true;
                break;
            case "4":
                ctrl.admin.Admin = true;
                break;
            case "10":
                ctrl.admin.SuperAdmin = true;
                break;
        };
        
        
        ctrl.checkAll = function() {
            ctrl.admin.SuperAdmin = ctrl.admin.Warehouse = ctrl.admin.Inventory =
            ctrl.admin.Customers = ctrl.admin.Pickup = ctrl.admin.Admin = ctrl.admin.Owner = ctrl.admin.All;
        };
        
        ctrl.updateAdmin = function() {
            //Edit Admin
            
            if(ctrl.admin.SuperAdmin)
                ctrl.role = "10";
            else if(ctrl.admin.Admin)
                ctrl.role = "4";
            else if(ctrl.admin.Warehouse)
                ctrl.role = "3";
            else if(ctrl.admin.Inventory)
                ctrl.role = "2";
            else if(ctrl.admin.Customers)
                ctrl.role = "1";
            else if(ctrl.admin.Pickup)
                ctrl.role = "0";
            else if(ctrl.admin.Owner)
                ctrl.role = "0";
            
                var params = JSON.stringify({
                          email: ctrl.admin.email,
                          name: ctrl.admin.username,
                          role: ctrl.role
                      });
            $http({
                    url: '/rest/admin/editAdmin',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": ctrl.key
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.modalInstance.close({action: 'update'});
                        // ctrl.modalInstance.close({action: 'edit', details: ctrl.admin});
                    }
                })
                .catch(function(err) {
                    console.log('Error getting Admin lists:');
                    console.log(err);
                })

        };
       
    }

    angular.module('addAdminModal')
        .component('addAdminModal', {
            templateUrl: 'manage-admin/manage-admin-modal/manage-admin-modal.template.html',
            controller: ['$rootScope', '$state', '$http', 'AdminRightsService', addAdminModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);