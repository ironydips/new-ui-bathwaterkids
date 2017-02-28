(function(angular) {
'use strict';

function ProfileModalController($state,customerUserService) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
	ctrl.update = true;

	ctrl.init = function(){
				customerUserService.getUserInventory(ctrl.customer.userID)
					.then(function(response){
						ctrl.userInventory = response.data;
					})
					.catch(function(err){
						console.log('Error getting user-profile details:');
						console.log(err);
					});	
				};

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};
	
	ctrl.init();
}

angular.module('customerProfileModal')
	.component('customerProfileModal',{
		templateUrl: 'customers/customer-profile-modal/customer-profile-modal.template.html',
		controller:['$state','customerUserService', ProfileModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);