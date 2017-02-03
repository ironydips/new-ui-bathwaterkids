'use strict';

function DriversTabController($rootScope,$state,$http) {
	var ctrl = this;
}

angular.module('driversTab')
	.component('driversTab',{
		templateUrl: 'driver/driver-tab/driver-tab.template.html',
		controller:['$rootScope','$state', '$http', DriversTabController]
	});