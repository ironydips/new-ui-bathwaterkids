(function(angular) {
'use strict';

function ViewProfileController($state) {
	var ctrl = this;
	ctrl.cancel = function(){
		ctrl.modalInstance.close();
		};
	}

angular.module('viewCustomerModal')
	.component('viewCustomerModal',{
		templateUrl: 'inventory/view-customer-modal/view-customer-modal.template.html',
		controller:['$state', ViewProfileController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);