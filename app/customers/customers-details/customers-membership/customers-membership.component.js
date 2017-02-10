(function(angular) {

'use strict';

function customersMembershipController($state,$http) {
	var ctrl = this;

		ctrl.init = function(){
		//get membership details.
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
				console.log('Error getting memberships details:');
				console.log(err);
			})
	};

	ctrl.init();
}

angular.module('customersMembership')
.component('customersMembership',{
	templateUrl: 'customers/customers-details/customers-membership/customers-membership.template.html',
	controller:['$state','$http', customersMembershipController]
});
})(window.angular);