(function(angular) {

'use strict';
function addTimeslotPopUp(details){

	var modalInstance = this.$uibModal.open({
			component: 'timeslotModal',
			windowClass: 'app-modal-window-large',
			resolve: function(){
				return (details||{});
			},
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-promo Modal');
			console.log(err);
		})
		)
}
function showTimeslotPopup(details){

	var modalInstance = this.$uibModal.open({
			component: 'timeslotShowAllModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in show-promo Modal');
			console.log(err);
		})
		)
}


function TimeslotController($rootScope,$state,$uibModal, TimeslotService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){

		TimeslotService.getTimeslotsForTheWeek()
			.then(function(timeslotDetails){
				ctrl.timeslots = timeslotDetails.data;
			})
			.catch(function(err){
				console.log('Error getting timeslot details:');
				console.log(err);
			})
	};

	ctrl.addTimeslot = function(){
		angular.bind(ctrl,addTimeslotPopUp,null)();
	};
	ctrl.showallTimeslot = function(){
		angular.bind(ctrl, showTimeslotPopup, null)();
	};

	ctrl.init(); 
}




angular.module('timeslotDetails')
	.component('timeslotDetails',{
		templateUrl: 'admin/timeslot/timeslot-details/timeslot-details.template.html',
		controller:['$rootScope','$state','$uibModal','TimeslotService', TimeslotController]
	});
})(window.angular);