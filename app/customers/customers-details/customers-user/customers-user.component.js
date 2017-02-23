(function(angular) {

'use strict';

function customersUserController($state, customerUserService) {
	var ctrl = this;

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

	ctrl.init();
}

angular.module('customersUser')
.component('customersUser',{
	templateUrl: 'customers/customers-details/customers-user/customers-user.template.html',
	controller:['$state','customerUserService', customersUserController]
});
})(window.angular);