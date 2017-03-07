(function(angular) {

'use strict';
function addTimeslotPopUp(details){

	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'addInventoryModal',
			windowClass: 'app-modal-window-large',
			resolve: function(){
				return (details||{});
			},
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
					if(data && data.action == "update") popUpCtrl.init();
				
				}),function(err){
					console.log('Error in add-timeslot Modal');
					console.log(err);
			}
		
}
function showTimeslotPopup(details){

	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'incomingShowAllModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
				}),function(err){
					console.log('Error in show-timeslot Modal');
					console.log(err);
		}
		
}


function IncomingController($state, $uibModal) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){

	};

	//Add Timeslot
	ctrl.addInventory = function(){
		angular.bind(ctrl,addTimeslotPopUp,null)();
	};
	//Show Timeslot
	ctrl.showallIncoming = function(){
		angular.bind(ctrl, showTimeslotPopup, null)();
	};

	ctrl.init(); 
}

angular.module('incomingDetails')
	.component('incomingDetails',{
		templateUrl: 'warehouse/incoming/incoming-details/incoming-details.template.html',
		controller:['$state','$uibModal', IncomingController]
	});
})(window.angular);
