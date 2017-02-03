'use strict';

function TrucksTabController($rootScope,$state,$http) {
	var ctrl = this;
}

angular.module('trucksTab')
	.component('trucksTab',{
		templateUrl: 'truck/truck-tab/truck-tab.template.html',
		controller:['$rootScope','$state', '$http', TrucksTabController]
	});