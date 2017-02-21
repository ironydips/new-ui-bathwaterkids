'use strict';

function AdminPanelController($scope, $state, AdminRightsService) {
	var ctrl = this;

	ctrl.userRights = AdminRightsService.getRights();
}

angular.module('adminPanel')
.component('adminPanel',{
	templateUrl: 'admin/admin-panel/admin-panel.template.html',
	controller:['$scope','$state','AdminRightsService', AdminPanelController]
});