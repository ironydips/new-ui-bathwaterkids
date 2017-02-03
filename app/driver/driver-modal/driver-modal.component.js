'use strict';

function DriverModalController($rootScope,$state, $http) {
	var ctrl = this;
	ctrl.newDriver = {};
	ctrl.submit = function(){                  
		var dataString = angular.element("#createForm").serialize();

		$http({
			url: 'https://staging.bathwaterkids.com/rest/addDriver',
            method: "POST",
            data: dataString,
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4=",
                "Content-Type": "application/x-www-form-urlencoded"
            }
		})
		.then(function(result){
			$state.go('adminLayout.driverDetails');
		})
		.catch(function(err){
			console.log('Error Adding Driver');
			console.log(err);
		});
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('driverModal')
	.component('driverModal',{
		templateUrl: 'driver/driver-modal/driver-modal.template.html',
		controller:['$rootScope','$state','$http', DriverModalController],
		bindings:{
			modalInstance: '<'
		}
	});