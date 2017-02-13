(function(angular) {
    'use strict';

    function addAdminModalModalController($rootScope, $state, $http, AdminRightsService) {
        var ctrl = this;
        ctrl.admin = (ctrl.resolve && ctrl.resolve.details) || {};

        ctrl.isDisabled = Object.keys(ctrl.admin).length > 0;
        ctrl.isEdited = Object.keys(ctrl.admin).length > 0;



        ctrl.saveAdmin = function() {
            var params = JSON.stringify({
                          email: ctrl.admin.email,
                          name: ctrl.admin.username,
                          role: 1
                      });
            $http({
                    url: '/rest/admin/addAdmin',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        // ctrl.modalInstance.close({action: 'update'});
                        ctrl.modalInstance.close({action: 'add', details: ctrl.admin});
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

        ctrl.checkAll = function() {
            ctrl.admin.SuperAdmin = ctrl.admin.Warehouse = ctrl.admin.Inventory =
            ctrl.admin.Customers = ctrl.admin.Pickup = ctrl.admin.Admin = ctrl.admin.Owner = ctrl.admin.All;
        };
        
        ctrl.updateAdmin = function() {
            console.log(ctrl.admin);

            ctrl.modalInstance.close('update');

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