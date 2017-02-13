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
            if (data.action == "update") this.getAdminList();
            if(data.action == "add") this.adminList.push(data.details);
            if(data.action == "edit") this.adminList.push(data.details);

        }), angular.bind(this, function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }))
    }

    function manageAdminController($state, $stateParams, $http, $uibModal, AdminRightsService) {

        debugger;
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.userProfile = {};
        ctrl.adminList = [];

        //API /admin/login
        ctrl.init = function() {

            //Save Profile
            if($stateParams && $stateParams.profile){
                var profileInfo = angular.fromJson($stateParams.profile).result;

                //save to service.
                AdminRightsService.saveProfile(profileInfo);
                ctrl.userProfile = profileInfo;
            }
            else{
                ctrl.userProfile = angular.copy(AdminRightsService.getProfile());
            }

            adminLogin();
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

        // Function inside scope controller.
        function adminLogin(){
            //Get admin details.
            var params = JSON.stringify({
                          email: ctrl.userProfile.email
                      });
            $http({
                    url: '/rest/admin/login',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        var role = response.data.role;
                        var rights = response.data.rights;

                        if(role == 0){
                            ctrl.isSuperAdmin = false;

                            //TODO: to verify
                            AdminRightsService.saveRights(angular.copy(rights));
                        }
                        else if(role == 1){
                            ctrl.isSuperAdmin = true;

                            ctrl.getAdminList();
                        }
                        ctrl.value = response.data.role;
                    }
                })
                .catch(function(err) {
                    console.log('Error logging as Admin');
                    console.log(err);
                })
        }

        ctrl.getAdminList =function (){
            var params = JSON.stringify({
                          email: ctrl.userProfile.email
                      });
            $http({
                    url: '/rest/admin/listAdmins',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.adminList = response.data;
                    }
                })
                .catch(function(err) {
                    console.log('Error getting Admin lists:');
                    console.log(err);
                })
        }

    }

    angular.module('manageAdmin')
        .component('manageAdmin', {
            templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
            controller: ['$state','$stateParams', '$http', '$uibModal', 'AdminRightsService', manageAdminController]
        });
})(window.angular);