'use strict';

function TimeslotModalController($rootScope,$state) {
	var ctrl = this;

	ctrl.save = function(){                  
		
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('timeslotModal')
	.component('timeslotModal',{
		templateUrl: 'timeslot/timeslot-modal/timeslot-modal.template.html',
		controller:['$rootScope','$state', TimeslotModalController],
		bindings:{
			modalInstance: '<'
		}
	});