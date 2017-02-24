(function(angular){
	'use strict';

	function openPopupCustomer(details){

		var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewCustomerModal',
            windowClass: 'app-modal-window-large',
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
            
        }), function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }
	}

	function inventoryDetailsController($state, $uibModal){
		var ctrl = this;
		ctrl.$state = $state;
		ctrl.$uibModal = $uibModal;

		ctrl.viewCustomer = function(){
			angular.bind(ctrl, openPopupCustomer, null)();
		};

	}
	
	angular.module('allinventoriesDetails')
	.component('allinventoriesDetails',{
		templateUrl: 'inventory/inventory-details/inventory-details.template.html',
		controller:['$state','$uibModal', inventoryDetailsController]
	});

})(window.angular);