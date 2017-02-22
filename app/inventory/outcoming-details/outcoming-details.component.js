(function(angular){
	'use strict';

	function outcomingDetailsController($state){
		var ctrl = this;

	}
	
	angular.module('outcomingDetails')
	.component('outcomingDetails',{
		templateUrl: 'inventory/outcoming-details/outcoming-details.template.html',
		controller:['$state', outcomingDetailsController]
	});

})(window.angular);