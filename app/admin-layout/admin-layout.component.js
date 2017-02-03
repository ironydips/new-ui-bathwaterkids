'use strict';

function AdminLayoutController($state) {
	var ctrl = this;
}

angular.module('adminLayout')
.component('adminLayout',{
	templateUrl: 'admin-layout/admin-layout.template.html',
	controller:['$state', AdminLayoutController]
});