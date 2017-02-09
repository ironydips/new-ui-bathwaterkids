(function(angular) {

    'use strict'

    function transformData(adminrights) {
        adminrights.Owner = adminrights.Owner,
            adminrights.All = adminrights.All,
            adminrights.Admin = adminrights.Admin,
            adminrights.Pickup = adminrights.Pickup,
            adminrights.Customers = adminrights.Customers,
            adminrights.Inventory = adminrights.Inventory,
            adminrights.Warehouse = adminrights.Warehouse,
            adminrights.SuperAdmin = adminrights.SuperAdmin,
            adminrights.username = adminrights.username,
            adminrights.email = adminrights.email

        return adminrights;
    }

    function openPopUpAdmin(details) {

        var modalInstance = this.$uibModal.open({
            component: 'addAdminModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(angular.bind(this, function(data) {
            //data passed when pop up closed.
            if (data == "update") this.$state.reload();

        }), angular.bind(this, function(err) {
            console.log('Error in add-driver Modal');
            console.log(err);
        }))
    }


    function manageAdminController($state, $http, $uibModal, AdminRightsService) {

        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.arrayOfAdmin = AdminRightsService.getRights();



        ctrl.init = function() {
            //get admin details.
            $http({
                    url: '/rest/admin/login',
                    method: "POST",
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                })
                .then(function(response) {
                    if (response && response.data && response.data.role == 1) {
                        ctrl.value = response.data.role;
                    }
                })
                .catch(function(err) {
                    console.log('Error getting driver details:');
                    console.log(err);
                })
        };

        ctrl.edit = function(adminrights) {

            AdminRightsService.setAdmin("editadmin");
            angular.bind(ctrl, openPopUpAdmin, transformData(adminrights))();

        }
        ctrl.delete = function(index) {
            //TODO: Make API Hit for this
            ctrl.arrayOfAdmin.splice(index, 1);
        }

        ctrl.addadmin = function() {
            angular.bind(ctrl, openPopUpAdmin, null)();
            AdminRightsService.setAdmin("addadmin");
        }
        ctrl.init();

    }

    angular.module('manageAdmin')
        .component('manageAdmin', {
            templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
            controller: ['$state', '$http', '$uibModal', 'AdminRightsService', manageAdminController]
        });
})(window.angular);