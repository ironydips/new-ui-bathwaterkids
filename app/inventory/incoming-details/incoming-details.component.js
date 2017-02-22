(function(angular){
	'use strict';

	function incomingDetailsController($state){
		var ctrl = this;

	}
	
	angular.module('incomingDetails')
	.component('incomingDetails',{
		templateUrl: 'inventory/incoming-details/incoming-details.template.html',
		controller:['$state', incomingDetailsController]
	});

})(window.angular);