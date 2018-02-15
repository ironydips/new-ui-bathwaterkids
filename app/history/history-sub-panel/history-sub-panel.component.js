'use strict';

function HistorySubPanelController($state) {
	var ctrl = this;
}

angular.module('historySubPanel')
.component('historySubPanel',{
	templateUrl: 'history/history-sub-panel/history-sub-panel.template.html',
	controller:['$state', HistorySubPanelController]
});