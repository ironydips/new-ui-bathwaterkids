(function(angular) {
'use strict';

function userReqModalController($state,customerUserService) {
	var ctrl = this;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
	ctrl.update = true;

	ctrl.init = function(){
				
				customerUserService.getUserRequest(ctrl.customer.userID)
					.then(function(response){
						ctrl.userReq = response.data;
						ctrl.userStatus = angular.copy(ctrl.userReq);


					//To filter the customer's whose status is completed or not started
						ctrl.status = ctrl.userStatus.filter(function(element){
                                    return element.status == 'completed' || element.status == 'not started';
                                });
					
						// ctrl.completeStatus = ctrl.userStatus.filter(function(element){
      //                               return element.status == 'completed';
      //                           });
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

angular.module('customerUserReqModal')
	.component('customerUserReqModal',{
		templateUrl: 'customers/customer-userRequest-modal/customer-userRequest-modal.template.html',
		controller:['$state','customerUserService', userReqModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);