'use strict';

function DriverDetailsController($rootScope, $state,$http) {
	var ctrl = this;

	$http({
            url: 'https://staging.bathwaterkids.com/rest/getAllDrivers',
            method: "GET",
            headers:{
            	"Authorization": 'Basic YWRtaW46YWRtaW4='
            }
        })
		.then(function(driverDetails){
			ctrl.drivers = driverDetails.data;
		})
		.catch(function(err){
			console.log('Error getting driver details:');
			console.log(err);
		})
}

angular.module('driverDetails')
	.component('driverDetails',{
		templateUrl: 'driver/driver-details/driver-details.template.html',
		controller:['$rootScope','$state','$http', DriverDetailsController]
	});