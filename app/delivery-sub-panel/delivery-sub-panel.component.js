'use strict';

function DeliverySubPanelController($state) {
	var ctrl = this;
}

angular.module('deliverySubPanel')
.component('deliverySubPanel',{
	templateUrl: 'delivery-sub-panel/delivery-sub-panel.template.html',
	controller:['$state', DeliverySubPanelController]
});