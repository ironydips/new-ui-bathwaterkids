(function(angular) {
'use strict';

function customerSubItemModalController($state) {
	var ctrl = this;
	ctrl.imageURLs = [];
	ctrl.myInterval = 3000;

	ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};
	console.log(ctrl.item)

	ctrl.init = function(){
		if(ctrl.item.subItems){
			ctrl.subItems = ctrl.item.subItems;
			for(var i=0;i< ctrl.subItems.length;i++){
				for(var j= 0; j<=i;j++){
					ctrl.imageURLs.push(ctrl.item.subItems[i].imageURLs[j]);
					console.log(ctrl.imageURLs)
				}
				
			}
			
		}
	}
	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	};
	ctrl.init();
	
}

angular.module('customerSubItemModal')
	.component('customerSubItemModal',{
		templateUrl: 'customers/customer-subitem-modal/customer-subitem-modal.template.html',
		controller:['$state', customerSubItemModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);