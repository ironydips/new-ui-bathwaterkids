(function(angular) {

'use strict';

function customersMembershipController($state,customerUserService) {
	var ctrl = this;

		ctrl.init = function(){
		//get membership details.
				customerUserService.getUsers()
					.then(function(userlist){
						ctrl.listofUsers = userlist.data;
					})
					.catch(function(err){
						console.log('Error getting memberships details:');
						console.log(err);
					})
	};

	ctrl.init();
}

angular.module('customersMembership')
.component('customersMembership',{
	templateUrl: 'customers/customers-details/customers-membership/customers-membership.template.html',
	controller:['$state','customerUserService', customersMembershipController]
});
})(window.angular);