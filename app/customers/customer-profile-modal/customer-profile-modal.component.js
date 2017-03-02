(function(angular) {
'use strict';

function ProfileModalController($state,customerUserService) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;

	ctrl.init = function(){

					if(!ctrl.customer.hasOwnProperty("address")){
						ctrl.message = "Data does not exist";
					}
					if (!ctrl.customer.hasOwnProperty("storedItems")) {
						ctrl.itemMessage = "Data does not exist";
					}
							

				customerUserService.getUserInventory(ctrl.customer.userID)
					.then(function(response){
						ctrl.userInventory = response.data;
						console.log(ctrl.userInventory)
					})
					.catch(function(err){
						console.log('Error getting user-profile details:');
						console.log(err);
					});
				//getting items of inventory	
				customerUserService.getInventory(ctrl.customer.userID)
					.then(function(response){
						ctrl.Inventory = response.data;
						console.log(ctrl.Inventory)
					})
					.catch(function(err){
						console.log('Error getting user-items details:');
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