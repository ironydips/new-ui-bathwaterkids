'use strict';

function AdminPanelController($scope, $state, $filter, AdminRightsService) {
	var ctrl = this;

	ctrl.listofRights = AdminRightsService.getRights();
	//WHY
	ctrl.GetLoginUser = $filter('findLoginUser')(ctrl.listofRights, "supriya");
}

angular.module('adminPanel')
.component('adminPanel',{
	templateUrl: 'admin/admin-panel/admin-panel.template.html',
	controller:['$scope','$state','$filter','AdminRightsService', AdminPanelController]
});