function IndexController($state , AdminRightsService) {
	var ctrl = this;

	var userRights = AdminRightsService.getRights();
	ctrl.open = function(name){
		switch(name){
			case 'admin': {
				if(userRights.role == "10" || userRights.role == "4") $state.go('adminLayout.drivers');
				else if(userRights.role == "0") $state.go('deliveryLayout.userRequests');
				else if(userRights.role == "1") $state.go('customers.user');
				break;
			}
			case 'junit': break;
			case 'pick': break;
			case 'consumer': break;
		}
	};
}

angular.module('index')
.component('index',{
	templateUrl: 'index/index.template.html',
	controller: ['$state','AdminRightsService', IndexController]
});