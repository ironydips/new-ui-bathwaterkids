(function(angular) {
'use strict';

function openSubItem(details){

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
            //if (data && data.action == "update");
            
        }), function(err) {
            console.log('Error in manage-admin Modal');
            console.log(err);
        }
}

function userReqModalController($state,$uibModal,customerUserService) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.customer = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.customer).length > 0;
	ctrl.userReq = [];
	ctrl.itemsArray = [];

	ctrl.init = function(){
				customerUserService.getUserRequest(ctrl.customer.userID)
					.then(function(response){


						if(response.data.length > 0){

							response.data.forEach(function(data){
								data.isChecked = false;
							});
							
							ctrl.userReq = response.data;
				
						}else {
							ctrl.message = "Data does not exist";
							ctrl.itemsMessage = "Data does not exist";
						}
					})
					.catch(function(err){
						console.log('Error getting user-request details:');
						console.log(err);
					});	
				};

	ctrl.getItems = function(item){

		if(item.items){
			if(item.isChecked){
				item.items.forEach(function(data){ data.userRequestID = item.userRequestID});
				ctrl.itemsArray = ctrl.itemsArray.concat(item.items);
			}
			else
				ctrl.itemsArray = ctrl.itemsArray.filter(function(data){return data.userRequestID != item.userRequestID});
		}
	};

	ctrl.subItems = function(subitem){

		angular.bind(ctrl, openSubItem , subitem)();
	};

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};

	ctrl.init();
}

angular.module('customerUserReqModal')
	.component('customerUserReqModal',{
		templateUrl: 'customers/customer-userRequest-modal/customer-userRequest-modal.template.html',
		controller:['$state','$uibModal','customerUserService', userReqModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);