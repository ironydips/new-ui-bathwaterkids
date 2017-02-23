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
            if (data && data.action == "update") this.init();
            
        }), angular.bind(this, function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }))
    }

    function manageAdminController($state, $uibModal, AdminManagerService) {

        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.adminList = [];

        //API /admin/login
        ctrl.init = function() {
            ctrl.isSuperAdmin = true;
            getAdminList();
          };

        ctrl.continue = function(){
            $state.go('index');
        };

        ctrl.edit = function(adminrights) {
            angular.bind(ctrl, openPopUpAdmin, angular.copy(adminrights))();
        };

        ctrl.delete = function(selectedEmail) {
           var params = JSON.stringify({
                          email: selectedEmail
                      });   

                AdminManagerService.deleteAdmin(params)
                        .then(function(response) {
                            //TODO
                        })
                        .catch(function(err) {
                            console.log('Error in deleting Admin from admin list lists:');
                            console.log(err);
                        })
        };

        ctrl.addadmin = function() {
            angular.bind(ctrl, openPopUpAdmin, null)();
        };

        ctrl.init();

        function getAdminList(){

           AdminManagerService.listofAdmin()
                .then(function(response) {
                    if (response && response.data) {
                        ctrl.adminList = response.data;
                   }
                })
                .catch(function(err) {
                    console.log('Error getting Admin lists:');
                    console.log(err);
                })
        };
    }

    angular.module('manageAdmin')
        .component('manageAdmin', {
            templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
            controller: ['$state', '$uibModal','AdminManagerService', manageAdminController]
        });
})(window.angular);