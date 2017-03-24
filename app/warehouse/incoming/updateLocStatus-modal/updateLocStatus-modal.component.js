(function(angular) {


'use strict';
function UpdateLocStatusModalController($state, warehouseMoveItemService){
	var ctrl = this;
	ctrl.itemDetail = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.item = {
            "status": "INBOUND",
            "allStatus": ["INBOUND", "OUTBOUND", "STORED", "RECEIVED","REQUESTED_DROPFF"]
        };

	ctrl.save = function(location , status){     
		warehouseMoveItemService.updateItemInWarehouse(ctrl.itemDetail.storedItemId, location, status)
				.then(function(result){
			ctrl.modalInstance.close({action: 'update'});
		})
		.catch(function(err){
			console.log('Error updating status & location of item in warehouse');
			console.log(err);
		});

		
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('updateLocStatusModal')
	.component('updateLocStatusModal',{
		templateUrl: 'warehouse/incoming/updateLocStatus-modal/updateLocStatus-modal.template.html',
		controller:['$state','warehouseMoveItemService', UpdateLocStatusModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);