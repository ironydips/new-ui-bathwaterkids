(function(angular) {
'use strict';

function editAdminModalModalController($rootScope,$state,$http) {
	var ctrl = this;
	ctrl.admin = {};
	// var adminArr = [];
	// ctrl.adminArr =adminArray;
	ctrl.isDisabled = Object.keys(ctrl.admin).length > 0;


	ctrl.saveAdmin = function(){

			
			
		// adminArrayService.addadmin(ctrl.admin);
			
			ctrl.modalInstance.close('update');

	}
	
	


	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	//  ctrl.listoftruck();
	//  ctrl.listofdriver();
}

angular.module('editAdminModal')
	.component('editAdminModal',{
		templateUrl: 'manage-admin/manage-admin-edit-modal/manage-admin-edit-modal.template.html',
		controller:['$rootScope','$state','$http', editAdminModalModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);