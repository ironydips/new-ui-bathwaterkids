'use strict';

function DriverDetailsController($rootScope, $state, $http, $uibModal) {
	var ctrl = this;

	ctrl.init = function(){

		//get driver details.
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
	};

	ctrl.addDriver = function(){
		var modalInstance = $uibModal.open({
			component: 'driverModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			
		}, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
	};

	ctrl.init();
}

angular.module('driverDetails')
	.component('driverDetails',{
		templateUrl: 'driver/driver-details/driver-details.template.html',
		controller:['$rootScope','$state','$http', '$uibModal', DriverDetailsController]
	});