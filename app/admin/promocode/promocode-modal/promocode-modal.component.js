(function(angular) {

'use strict';
function PromoModalModalController($rootScope,$state,PromocodeService){
	var ctrl = this;
	ctrl.promo = (ctrl.resolve && ctrl.resolve.detailsofPromo) || {};
	ctrl.isDisabled = Object.keys(ctrl.promo).length > 0;

	ctrl.save = function(promocode){            
		
		PromocodeService.uploadPromoFile(promocode,ctrl.promo)
		.then(function(result){
			ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error Adding promocode');
			console.log(err);
		});
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}




angular.module('promoModal')
	.component('promoModal',{
		templateUrl: 'admin/promocode/promocode-modal/promocode-modal.template.html',
		controller:['$rootScope','$state','PromocodeService', PromoModalModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);
