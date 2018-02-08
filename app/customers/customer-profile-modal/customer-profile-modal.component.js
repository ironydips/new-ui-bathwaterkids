(function(angular) {
'use strict';

function ProfileModalController($state,customerUserService) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;

	ctrl.init = function(){
					ctrl.loader = true;
					if(!ctrl.customer.hasOwnProperty("address")){
						ctrl.message = "Data does not exist";
					}
					// if (!ctrl.customer.hasOwnProperty("storedItems")) {
					// 	ctrl.itemMessage = "No items to display";
					// }
							

				customerUserService.getUserInventory(ctrl.customer.userID)
					.then(function(response){
						ctrl.loader = false;
						ctrl.userInventory = response.data;
					})
					.catch(function(err){
						console.log('Error getting user-profile details:');
						console.log(err);
					});
				

				customerUserService.getUserItems(ctrl.customer.userID)
					.then(function(response){
						ctrl.loader = false;
						ctrl.userItems = response.data;
						if (!ctrl.userItems.length>0) {
							ctrl.itemMessage = "No items to display";
						}
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