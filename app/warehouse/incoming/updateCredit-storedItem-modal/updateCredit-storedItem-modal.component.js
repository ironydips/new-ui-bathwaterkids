(function(angular) {


'use strict';
function UpdateCreditStoredModalController($state,warehouseMoveItemService){
	var ctrl = this;
	ctrl.itemDetail = (ctrl.resolve && ctrl.resolve.details) || {};
	console.log(ctrl.itemDetail)

	ctrl.save = function(location, credit){
		// if(location == ""){
		// 	location = "nolocation";
		// }     
		var credits = parseInt(credit);

		warehouseMoveItemService.checkInStoredItem(ctrl.itemDetail.storedItemId, "STORED", '2', location, credits)
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

angular.module('updateCreditStoredModal')
	.component('updateCreditStoredModal',{
		templateUrl: 'warehouse/incoming/updateCredit-storedItem-modal/updateCredit-storedItem-modal.template.html',
		controller:['$state','warehouseMoveItemService', UpdateCreditStoredModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);