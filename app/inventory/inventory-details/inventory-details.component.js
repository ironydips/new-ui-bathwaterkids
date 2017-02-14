(function(angular){
	'use strict';

	function inventoryDetailsController($state){
		var ctrl = this;

	}
	
	angular.module('allinventoriesDetails')
	.component('allinventoriesDetails',{
		templateUrl: 'inventory/inventory-details/inventory-details.template.html',
		controller:['$state', inventoryDetailsController]
	});

})(window.angular);