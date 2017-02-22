
(function(angular){
'use strict';

function TimeslotModalController($rootScope,$state, TimeslotService) {
	var ctrl = this;
	ctrl.timeslot = (ctrl.resolve && ctrl.resolve.detailsofPromo) || {days:{}, timeslots:{}, availables:{}};

	ctrl.save = function(){

	TimeslotService.createTimeSlotsRange(ctrl.timeslot)
		.then(function(result){
			ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error Timeslot detail');
			console.log(err);
		});
		
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('timeslotModal')
	.component('timeslotModal',{
		templateUrl: 'admin/timeslot/timeslot-modal/timeslot-modal.template.html',
		controller:['$rootScope','$state','TimeslotService', TimeslotModalController],
		bindings:{
			modalInstance: '<'
		}
	});

})(window.angular)