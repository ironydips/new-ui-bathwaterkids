(function(angular) {
'use strict';

function historyModalController($scope, $rootScope,$state,PickupTruckService) {
	var ctrl = this;
	
	ctrl.histories = function(){
		//get truck details.
		 PickupTruckService.getAllDriverTruckHistory()
			.then(function(truckDetails){
				ctrl.trkhistories = truckDetails.data;
			})
			.catch(function(err){
				console.log('Error getting truck histories details:');
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
		controller:['$scope','$rootScope','$state','PickupTruckService', historyModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);