(function(angular) {

    'use strict'

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
            console.log('Error in manage-admin Modal');
            console.log(err);
        }))
    }


    function manageAdminController($state, $http, $uibModal, AdminRightsService) {

        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.arrayOfAdmin = AdminRightsService.getRights();
        // ctrl.copyOfrightsList ={};



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
                    console.log('Error getting Manage Admin details:');
                    console.log(err);
                })
        };

        ctrl.edit = function(adminrights) {
            angular.bind(ctrl, openPopUpAdmin, angular.copy(adminrights))();

        }
        ctrl.delete = function(index) {
            //TODO: Make API Hit for this
            ctrl.arrayOfAdmin.splice(index, 1);
        }

        ctrl.addadmin = function() {
            angular.bind(ctrl, openPopUpAdmin, null)();
        }
        ctrl.init();

    }

    angular.module('manageAdmin')
        .component('manageAdmin', {
            templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
            controller: ['$state', '$http', '$uibModal', 'AdminRightsService', manageAdminController]
        });
})(window.angular);