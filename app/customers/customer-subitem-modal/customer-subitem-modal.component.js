(function(angular) {
'use strict';

function customerSubItemModalController($state) {
	var ctrl = this;
	ctrl.imageURLs = [];
	ctrl.item = (ctrl.resolve && ctrl.resolve.details) || {};

	ctrl.init = function(){

		if(ctrl.item.subItems){
			ctrl.subItems = ctrl.item.subItems;
			for(var i=0;i< ctrl.subItems.length;i++){
				for(var j= 0; j<=i;j++){
					if(typeof ctrl.item.subItems[i].imageURLs[j] == "undefined"){
							//ctrl.value = item.items[i].imagesBase64[j];
							ctrl.item.subItems[i].imageURLs[j] = "https://www.moh.gov.bh/Content/Upload/Image/636009821114059242-not-available.jpg";
							ctrl.imageURLs.push(ctrl.item.subItems[i].imageURLs[j]);

						}else{
							ctrl.imageURLs.push(ctrl.item.subItems[i].imageURLs[j]);
						}
				}
				
			}
			
		}
	};

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