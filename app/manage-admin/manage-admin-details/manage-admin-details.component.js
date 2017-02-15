(function(angular) {

    'use strict'
    function openPopUpDelete(details){
        var modalInstance = this.$uibModal.open({
            component:'deleteAdminModal',
            windowClass: 'app-modal-window-small',
            keyboard: false,
            resolve: {
                details: function(){
                    return (details || {});
            }
                
            },
            backdrop: 'static'

        });

        modalInstance.result.then(angular.bind(this, function(data) {
            if(data.action == "delete") {
                var index = data.details;
                this.adminList.splice(index, 1);
            }

        }), angular.bind(this, function(dismiss){
            console.log('Delete Operation is '+ dismiss);
        }))
    };
     

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
            console.log(data);
            //data passed when pop up closed.
            //if (data.action == "update") this.getAdminList();
            if(data.action == "add") this.adminList.push(data.details);
            if(data.action == "edit") {
                var index = this.adminList.map(function(row){return row.email }).indexOf(data.details.email);
                this.adminList[index] = angular.copy(data.details);
            }

        }), angular.bind(this, function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }))
    }

    function manageAdminController($state, $scope,  $stateParams, $http, $uibModal, AdminRightsService) {

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

        $scope.$watchCollection(angular.bind(ctrl, function(){
                return ctrl.adminList;
            }), function(newValue){
                ctrl.disallowContinue = newValue.map(function(data){return data.email}).indexOf(ctrl.userProfile.email) == -1;
            });

        ctrl.continue = function(){
            var loggedinUserData = ctrl.adminList.filter(function(element){
                                    return element.email == ctrl.userProfile.email;
                                });
            AdminRightsService.addRights(loggedinUserData[0]);
            $state.go('index');
        };


        ctrl.edit = function(adminrights) {
            angular.bind(ctrl, openPopUpAdmin, angular.copy(adminrights))();

        }

        ctrl.delete = function(index) {
            //TODO: Make API Hit for this
            angular.bind(ctrl,openPopUpDelete,index)();
        }

        ctrl.addadmin = function() {
            angular.bind(ctrl, openPopUpAdmin, null)();
        }

        ctrl.init();

        // Find Login Admin Function

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
                        ctrl.adminList.push(
                        {
                            email: 'supriyasingh9327@gmail.com',
                            username: 'supriya',
                            Admin: true,
                            Customer: true,
                            Pickup: true,
                            Warehouse: true,
                            Owner: true,
                            Inventory: true
                        }
                            );
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
            controller: ['$state','$scope', '$stateParams', '$http', '$uibModal', 'AdminRightsService', manageAdminController]
        });
})(window.angular);