(function(angular){
	'use strict';

	function openPopUpAssign(details){
		var modalInstance = this.$uibModal.open({
			component: 'deliverytruckModal',
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
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
	}
	function openPopUpHistory(details){
		var modalInstance = this.$uibModal.open({
			component: 'historyModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details||{});
				}
			},
			backdrop: 'static'
		});
		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)

	}

	function trucksController($rootScope,$state,$http,$uibModal){
		var ctrl = this;
		ctrl.$uibModal = $uibModal;
		ctrl.$state = $state;

		ctrl.assign = function(){
			angular.bind(ctrl,openPopUpAssign,null)();
		};
		ctrl.history = function(){
			angular.bind(ctrl,openPopUpHistory,null)();
		};
		

	}
	
	angular.module('deliveryTrucks')
	.component('deliveryTrucks',{
		templateUrl: 'pickup-delivery-management/delivery-trucks/delivery-trucks-details/delivery-trucks-details.template.html',
		controller:['$rootScope','$state','$http','$uibModal', trucksController]
	});

})(window.angular);