(function(angular) {
'use strict';

//transformed data for display
function transformData(truck){
	truck.dealerStreetAddress = truck.dealerAddress.streetAddress;
	truck.dealerCity = truck.dealerAddress.city;
	truck.dealerState = truck.dealerAddress.state;
	truck.dealerZip = truck.dealerAddress.zipCode;
	truck.dealerPhNumber = truck.phoneNumber;
	truck.leaseExpirationDate = truck.leaseExpiration;
	return truck;
}

function openPopUp(details){
	var modalInstance = this.$uibModal.open({
			component: 'truckModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-truck Modal');
			console.log(err);
		})
		)
}

function TruckDetailsController($rootScope, $state, $http, $uibModal, resizeService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){
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
	}

	ctrl.addTruck = function(){
		angular.bind(ctrl, openPopUp, null)();
	};

	ctrl.showDetails = function(truckDetails){
		angular.bind(ctrl, openPopUp, transformData(truckDetails))();
	}

	ctrl.init();
}

angular.module('truckDetails')
	.component('truckDetails',{
		templateUrl: 'truck/truck-details/truck-details.template.html',
		controller:['$rootScope','$state','$http', '$uibModal', 'resizeService', TruckDetailsController]
	});
})(window.angular);