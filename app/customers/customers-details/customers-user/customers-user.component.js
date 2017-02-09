(function(angular) {

'use strict';

function customersUserController($state, $http) {
	var ctrl = this;

		ctrl.init = function(){
		//get users details.
		$http({
	            url: '/rest/getUsers',
	            method: "GET",
	            headers:{
	            	"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        })
			.then(function(userlist){
				ctrl.listofUsers = userlist.data;
			})
			.catch(function(err){
				console.log('Error getting truck details:');
				console.log(err);
			})
	};

	ctrl.init();
}

angular.module('customersUser')
.component('customersUser',{
	templateUrl: 'customers/customers-details/customers-user/customers-user.template.html',
	controller:['$state','$http', customersUserController]
});
})(window.angular);