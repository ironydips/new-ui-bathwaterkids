(function(angular) {
'use strict';

function ProfileModalController($state,customerUserService) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
	ctrl.update = true;

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};
	ctrl.editCustomer= function(){
		ctrl.isDisabled = false;
		ctrl.update = false;
	};
	ctrl.updateCustomer = function(){
		ctrl.modalInstance.close();
	};
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