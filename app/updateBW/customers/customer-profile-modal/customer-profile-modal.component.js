(function(angular) {
'use strict';

function ProfileModalController($state,$uibModal,customerUserService,Lightbox) {
	var ctrl = this;
    ctrl.$uibModal = $uibModal;
	ctrl.imageArray = [];

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
			ctrl.imageArray = []
			for(let item of ctrl.userItems){
				if(item.imageURLs && item.imageURLs.length>0){
					for(let i=0;i<item.imageURLs.length;i++){
						if(!item.imageURLs[i]){
							item.imageURLs[i] = "img/not-available.jpg";
						}
					}
				}
				else{
					item.imageURLs = ["img/not-available.jpg"]
				}
			}
			if (!ctrl.userItems.length>0) {
				ctrl.itemMessage = "No items to display";
			}
		})
		.catch(function(err){
			console.log('Error getting user-profile details:');
			console.log(err);
		});
		
	};

    ctrl.openLightboxModal = function(images) {
    	console.log(images)
        //LightBox Library used as Image Viewer.
        Lightbox.openModal(images, 0);
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
		controller:['$state','$uibModal','customerUserService','Lightbox', ProfileModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);