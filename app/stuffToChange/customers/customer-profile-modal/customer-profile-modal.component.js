(function(angular) {
'use strict';

function ProfileModalController($state,$uibModal,customerUserService) {
	var ctrl = this;
    ctrl.$uibModal = $uibModal;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;

	ctrl.init = function(){
		ctrl.loader = true;
		if(!ctrl.customer.hasOwnProperty("address")){
			ctrl.message = "Data does not exist";
		}		
		customerUserService.getUserInventory(ctrl.customer.userID)
		.then(function(response){
			ctrl.loader = false;
			ctrl.userInventory = response.data;
		})
		.catch(function(err){
			console.log('Error getting user-profile details:');
			console.log(err);
		});
		
		customerUserService.getUserItems(ctrl.customer.userID)
		.then(function(response){
			ctrl.loader = false;
			ctrl.userItems = response.data;
			if (!ctrl.userItems.length>0) {
				ctrl.itemMessage = "No items to display";
			}
		})
		.catch(function(err){
			console.log('Error getting user-profile details:');
			console.log(err);
		});
		
	};

    ctrl.subItems = function(subitem) {
        angular.bind(ctrl, openSubItem, subitem)();
    };

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};

	function openSubItem(details) {
        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'customerSubItemModal',
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
        }),
        function(err) {
            console.log('Error in SubItem Modal');
            console.log(err);
        }
    }
	
	ctrl.init();
}

angular.module('customerProfileModal')
	.component('customerProfileModal',{
		templateUrl: 'customers/customer-profile-modal/customer-profile-modal.template.html',
		controller:['$state','$uibModal','customerUserService', ProfileModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);