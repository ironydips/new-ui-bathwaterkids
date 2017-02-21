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
            // if(data.action == "add") this.adminList.push(data.details);
            // if(data.action == "edit") {
            //     var index = this.adminList.map(function(row){return row.email }).indexOf(data.details.email);
            //     this.adminList[index] = angular.copy(data.details);
            // }

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
        ctrl.key = "";
        ctrl.adminList = [];

        //API /admin/login
        ctrl.init = function() {

            //Save Profile
            if($stateParams && $stateParams.profile){
                var profileInfo = angular.fromJson($stateParams.profile).result;

                //save to service.
                AdminRightsService.saveProfile(profileInfo);
                ctrl.userProfile = profileInfo;
                ctrl.key = $stateParams.key;
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
            AdminRightsService.addRights(ctrl.rights);
            $state.go('index');
        };


        ctrl.edit = function(adminrights) {
            angular.bind(ctrl, openPopUpAdmin, angular.copy(adminrights))();
        }

        ctrl.delete = function(selectedEmail) {
           // ctrl.adminList.splice(index, 1);
           var params = JSON.stringify({
                          email: selectedEmail
                      });           
            $http({
                    url: '/rest/admin/deleteAdmin',
                    method: "POST",
                    data: params,
                    headers: {
                        "Authorization": ctrl.key
                    }
                })
                .then(function(response) {
                    // if(response.data.message == 'Success') {
                    //     ctrl.getAdminList();
                    // }
                })
                .catch(function(err) {
                    console.log('Error in deleting Admin from admin list lists:');
                    console.log(err);
                })
        }

        ctrl.addadmin = function() {
            angular.bind(ctrl, openPopUpAdmin, null)();
        }

        ctrl.init();

        // Find Login Admin Function

        // Function inside scope controller.
        function adminLogin(){
            //Get admin details.
            ctrl.isSuperAdmin = false;
            var rights = {
                Admin: false,
                Pickup: false,
                Customers: false,
                Inventory: false,
                Warehouse: false
            };

            var params = JSON.stringify({
                          email: ctrl.userProfile.email,
                          id: ctrl.userProfile.id
                      });
            $http({
                    url: '/rest/admin/gloginsuccess?email='+ctrl.userProfile.email+'&id='+ctrl.userProfile.id,
                    method: "GET",
                    data: params,
                    headers: {
                        "Authorization": 'Basic YWRtaW46YWRtaW4='
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        var role = response.data.role;
                        ctrl.key = response.data.key;

                        switch(role){
                            case "0":
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "1":
                                rights.Customers = true;
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "2":
                                rights.Inventory = true;
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "3":
                                rights.Warehouse = true;
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "4":
                                rights.Admin = true;
                                AdminRightsService.addRights(rights);
                                $state.go('index');
                                break;
                            case "10":
                                ctrl.isSuperAdmin = true;
                                rights.Customers = true;
                                rights.Inventory = true;
                                rights.Warehouse = true;
                                rights.Admin = true;
                                ctrl.rights = rights;
                                ctrl.getAdminList();
                                break;
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
                        "Authorization": ctrl.key
                    }
                })
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.adminList = response.data;
                        if (ctrl.adminList.indexOf(ctrl.userProfile.email) >= 0) {
                          ctrl.isDisabled = false;
                        }
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