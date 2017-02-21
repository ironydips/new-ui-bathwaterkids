'use strict';



function TimeslotController($rootScope,$state,$http,$uibModal) {
	var ctrl = this;

	ctrl.init = function(){
		$http({
		    url: '/rest/getTimeslotsForTheWeek',
		    method: "GET",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(timeslotDetails){
			ctrl.timeslots = timeslotDetails.data;
		})
		.catch(function(err){
			console.log('Error getting timeslot details:');
			console.log(err);
		})
	};

	ctrl.addTimeslot = function(){
		var modalInstance = $uibModal.open({
			component: 'timeslotModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			if(data == "update") $state.reload();
			
		}, function(err){
			console.log('Error in add-timeslot Modal');
			console.log(err);
		})
	};
	ctrl.showallTimeslot = function(){
		var modalInstance = $uibModal.open({
			component: 'timeslotShowAllModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") $state.reload();
			
		}, function(err){
			console.log('Error in Show-all Modal');
			console.log(err);
		})
	};

	ctrl.init(); 
}




angular.module('timeslotDetails')
	.component('timeslotDetails',{
		templateUrl: 'admin/timeslot/timeslot-details/timeslot-details.template.html',
		controller:['$rootScope','$state','$http','$uibModal',TimeslotController]
	});