(function(angular) {
'use strict';

function EditDeleteTSModalController($rootScope,$state, TimeslotService) {
	var ctrl = this;
	ctrl.timeslot = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.enableDel = false;


	ctrl.save = function(){                  
		ctrl.loader = true;
		var ts = {
			"slot" : ctrl.timeslot.time,
			"availableCount": ctrl.timeslot.availabilityCount
		};
		debugger;
		TimeslotService.createTimeslotForDate(ctrl.timeslot.date.value, ts)
			.then(function(result){
				ctrl.loader = false;
				ctrl.modalInstance.close({action: 'update'});
		})
		.catch(function(err){
			console.log('Error Adding Driver');
			console.log(err);
		});
	};
	ctrl.delete = function(){
		ctrl.enableDel = true;
		ctrl.timeslot.availabilityCount = 0;
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('editDeleteTSModal')
	.component('editDeleteTSModal',{
		templateUrl: 'admin/timeslot/edit-delete-singleTimeslot-modal/edit-delete-singleTimeslot-modal.template.html',
		controller:['$rootScope','$state','TimeslotService', EditDeleteTSModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);