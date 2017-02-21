(function(angular) {
'use strict';

function deliverytruckModalController($scope, $rootScope,$state,$http) {
	var ctrl = this;
	ctrl.assign = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.assign).length > 0;
	ctrl.listoftruck = function(){
		//get truck details.
		$http({
	            url: '/rest/getAllTrucks',
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
	};

	ctrl.listofdriver = function(){
		 $http({
        url: "/rest/getAllDrivers",
        method: "GET",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4="
        }
    })
            .then(function (response) {
               ctrl.drivers = response.data;
            });
	};

	ctrl.assign = function(driverid,truckid){
		
			$http({
			url: '/rest/assignDriverToTruck/'+ truckid + '?driverID=' + driverid,
            method: "GET",
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4="
                
            }
		})
		.then(function(result){
			//ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error in assigning truck & driver');
			console.log(err);
		});

	};
	
	


	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	 ctrl.listoftruck();
	 ctrl.listofdriver();
}

angular.module('deliverytruckModal')
	.component('deliverytruckModal',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-assign-modal/delivery-trucks-assign-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', deliverytruckModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);