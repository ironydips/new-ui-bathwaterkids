'use strict';

function TruckModalController($rootScope,$state,$http) {
	var ctrl = this;
	ctrl.newTruck = {};

	ctrl.submit = function(){
		var dataString = angular.element("#createForm").serialize();
		dataString += "&truckImage="+ ctrl.newTruck.truckImage.base64;

		$http({
			url: 'https://staging.bathwaterkids.com/rest/addTruck',
            method: "POST",
            data: dataString,
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4=",
                "Content-Type": "application/x-www-form-urlencoded"
            }
		})
		.then(function(result){
			$state.go('adminLayout.truckDetails');
		})
		.catch(function(err){
			console.log('Error Adding Driver');
			console.log(err);
		});
	}
}

angular.module('truckModal')
	.component('truckModal',{
		templateUrl: 'truck/truck-modal/truck-modal.template.html',
		controller:['$rootScope','$state','$http', TruckModalController]
	});