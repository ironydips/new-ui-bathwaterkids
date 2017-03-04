(function(angular){
	'use strict';

	function openPopupCustomer(details){

		var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'updateCreditModal',
            windowClass: 'app-modal-window-small',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
            //data passed when pop up closed.
            //if (data && data.action == "update");
            if(data && data.action == "update") popUpCtrl.init();
            
        }), function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }
	}

	function inventoryDetailsController($state, $uibModal,Lightbox, inventoryService){
		var ctrl = this;
		ctrl.$state = $state;
		ctrl.$uibModal = $uibModal;

		ctrl.init = function(){

			inventoryService.getInventory()
					.then(function(response){
						ctrl.Inventory = response.data;
						console.log(ctrl.Inventory)
					})
					.catch(function(err){
						console.log('Error getting user-items details:');
						console.log(err);
					});	

		};

		ctrl.openInventoryImages = function (images) {
				Lightbox.openModal(images, 0);
  		};
  		ctrl.selectRow = function(rowIndex){
         ctrl.selectedRow = rowIndex;
    	};

		ctrl.addUpdateCredit = function(item){
			angular.bind(ctrl, openPopupCustomer, angular.copy(item))();
		};

		ctrl.init();

	}
	
	angular.module('allinventoriesDetails')
	.component('allinventoriesDetails',{
		templateUrl: 'inventory/inventory-details/inventory-details.template.html',
		controller:['$state','$uibModal','Lightbox','inventoryService', inventoryDetailsController]
	});

})(window.angular);