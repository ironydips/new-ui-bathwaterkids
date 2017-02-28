(function(angular) {
'use strict';

function SubscribeModalController($state) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
	ctrl.update = true;

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};
	
}

angular.module('customerSubscribeModal')
	.component('customerSubscribeModal',{
		templateUrl: 'customers/customer-subscription-modal/customer-subscription-modal.template.html',
		controller:['$state', SubscribeModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);