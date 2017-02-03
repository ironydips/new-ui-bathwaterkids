'use strict';

function TruckDetailsController($rootScope, $state,$http) {
	var ctrl = this;

	$http({
            url: 'https://staging.bathwaterkids.com/rest/getAllTrucks',
            method: "GET",
            headers:{
            	"Authorization": 'Basic YWRtaW46YWRtaW4='
            }
        })
		.then(function(truckDetails){
			ctrl.trucks = truckDetails.data;
		})
		.catch(function(err){
			console.log('Error getting truck details:');
			console.log(err);
		})
}

angular.module('truckDetails')
	.component('truckDetails',{
		templateUrl: 'truck/truck-details/truck-details.template.html',
		controller:['$rootScope','$state','$http', TruckDetailsController]
	});