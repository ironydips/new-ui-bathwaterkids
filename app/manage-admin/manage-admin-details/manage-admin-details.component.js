	'use strict'

function openPopUpAddAdmin(details){

	var modalInstance = this.$uibModal.open({
			component: 'addAdminModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
}

function openPopUpEdit(details){
		var modalInstance = this.$uibModal.open({
			component: 'editAdminModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
}

function manageAdminController($state,$http,$uibModal,AdminRightsService){

	var ctrl= this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.arrayOfAdmin=[
            {email:'test123',username:'test',All:'No',Owner: 'Yes',Pickup:'No',Admin:'Yes',Customers:'Yes',Inventory:'No',Warehouse: 'No',SuperAdmin: 'Yes'},
            {email:'test456',username:'test1',All:'No',Owner: 'Yes',Pickup:'No',Admin:'Yes',Customers:'Yes',Inventory:'No',Warehouse: 'No',SuperAdmin: 'Yes'},
          ];

	ctrl.init = function(){
		//get driver details.
		$http({
		    url: '/rest/admin/login',
		    method: "POST",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(response){
			if(response && response.data && response.data.role == 1){
				ctrl.value = response.data.role;
			}
		})
		.catch(function(err){
			console.log('Error getting driver details:');
			console.log(err);
		})
	};

	ctrl.edit = function(a){
		angular.bind(ctrl,openPopUpEdit, null)();
	}
	ctrl.delete = function(index){
		//TODO: Make API Hit for this
		ctrl.arrayOfAdmin.splice(index, 1);
	}

	ctrl.addadmin = function(){
		angular.bind(ctrl,openPopUpAddAdmin, null)();
	}
	ctrl.init();

}

angular.module('manageAdmin')
.component('manageAdmin',{
	templateUrl: 'manage-admin/manage-admin-details/manage-admin-details.template.html',
	controller: ['$state','$http','$uibModal','AdminRightsService', manageAdminController]
});



