
(function(angular){
'use strict';

function addInventoryModalController($state) {
	var ctrl = this;
	ctrl.timeslot = {days:{}, timeslots:{}, availables:{}};
	
	ctrl.save = function(){

		};

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};
}

angular.module('addInventoryModal')
	.component('addInventoryModal',{
		templateUrl: 'warehouse/incoming/inventoryItems-modal/inventoryItems-modal.template.html',
		controller:['$state', addInventoryModalController],
		bindings:{
			modalInstance: '<'
		}
	});

})(window.angular)