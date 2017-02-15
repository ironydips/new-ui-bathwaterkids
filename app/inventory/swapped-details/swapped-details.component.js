(function(angular){
	'use strict';

	function swappedDetailsController($state){
		var ctrl = this;

	}
	
	angular.module('swappedDetails')
	.component('swappedDetails',{
		templateUrl: 'inventory/swapped-details/swapped-details.template.html',
		controller:['$state', swappedDetailsController]
	});

})(window.angular);