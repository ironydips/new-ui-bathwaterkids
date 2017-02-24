(function(angular) {

'use strict';

function openPopUpProfile(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'customerProfileModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
            //data passed when pop up closed.
            //if (data && data.action == "update");
            
        }), function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }
    }

function customersUserController($state,$uibModal, customerUserService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;
	ctrl.listofUsers = {};

	ctrl.init = function(){
		//get users details.
				customerUserService.getUsers()
					.then(function(userlist){
						ctrl.listofUsers = userlist.data;
					})
					.catch(function(err){
						console.log('Error getting user details:');
						console.log(err);
					});
	};

	ctrl.save = function(profile){
		angular.bind(ctrl, openPopUpProfile, profile)();
	}

	ctrl.init();
}

angular.module('customersUser')
.component('customersUser',{
	templateUrl: 'customers/customers-details/customers-user/customers-user.template.html',
	controller:['$state','$uibModal','customerUserService', customersUserController]
});
})(window.angular);