(function(angular) {
'use strict';

function historyModalController($scope, $rootScope,$state,$http) {
	var ctrl = this;
	
	ctrl.histories = function(){
		//get truck details.
		$http({
	            url: '/rest/getAllDriverTruckHistory',
	            method: "GET",
	            headers:{
	            	"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        })
			.then(function(truckDetails){
				ctrl.trkhistories = truckDetails.data;
			})
			.catch(function(err){
				console.log('Error getting truck details:');
				console.log(err);
			})
	};


	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	 ctrl.histories();
}

angular.module('historyModal')
	.component('historyModal',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-history-modal/delivery-trucks-history-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', historyModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);