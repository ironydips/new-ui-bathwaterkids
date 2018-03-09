'use strict';

function UploadExcelSubPanelController($state) {
	var ctrl = this;
}

angular.module('uploadExcelSubPanel')
.component('uploadExcelSubPanel',{
	templateUrl: 'uploadExcel/uploadExcel-sub-panel/uploadExcel-sub-panel.template.html',
	controller:['$state', UploadExcelSubPanelController]
});