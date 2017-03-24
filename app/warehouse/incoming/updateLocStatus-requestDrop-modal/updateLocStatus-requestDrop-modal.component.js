(function(angular) {


'use strict';
function UpdateLocRequestDropModalController($state, warehouseMoveItemService){
	var ctrl = this;
	ctrl.itemDetail = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.item = {
            "status": "INBOUND",
            "allStatus": ["INBOUND", "OUTBOUND", "STORED", "RECEIVED","REQUESTED_DROPFF"]
        };

	ctrl.save = function(location){     
		warehouseMoveItemService.updateItemInWarehouse(ctrl.itemDetail.storedItemId, location, "REQUESTED_DROPFF")
				.then(function(result){
			ctrl.modalInstance.close({action: 'update'});
		})
		.catch(function(err){
			console.log('Error updating status & location of item in warehouse');
			console.log(err);
		});

		// warehouseMoveItemService.updateDropItemStatus(ctrl.itemDetail.storedItemId, location, status, ctrl.itemDetail.itemCode[0])
		// 		.then(function(result){
		// 	//ctrl.modalInstance.close({action: 'update'});
		// 	console.log(result)
		// })
		// .catch(function(err){
		// 	console.log('Error updating status & location of item in warehouse');
		// 	console.log(err);
		// });
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('updateLocRequestDropModal')
	.component('updateLocRequestDropModal',{
		templateUrl: 'warehouse/incoming/updateLocStatus-requestDrop-modal/updateLocStatus-requestDrop-modal.template.html',
		controller:['$state','warehouseMoveItemService', UpdateLocRequestDropModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);