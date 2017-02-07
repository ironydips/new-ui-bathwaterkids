'use strict';

function openPopUpPromo(detailsofPromo){
		var modalInstance = this.$uibModal.open({
			component: 'promoModal',
			windowClass: 'app-modal-window-small',
			keyboard: false,
			resolve:{
				detailsofPromo: function(){
					return (detailsofPromo || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-promo Modal');
			console.log(err);
		})
		)
}

function PromoCodeDetailsController($rootScope,$state,$http,$uibModal){
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){
		//get driver details.
		$http({
		    url: '/rest/getPromos',
		    method: "GET",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(promoCodes){
			ctrl.promocode = promoCodes.data;
		})
		.catch(function(err){
			console.log('Error getting promocode details:');
			console.log(err);
		})
	};
	ctrl.addPromoCode = function(){
		angular.bind(ctrl, openPopUpPromo, null)();
	};
	ctrl.deletePromoCode = function(promocode){
		//Show alert and then delete if Yes.

		$http({
		    url: '/rest/deletePromoCode/' + promocode,
		    method: "GET",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(promoCodes){
			$state.reload();
		})
		.catch(function(err){
			console.log('Error getting promocode details:');
			console.log(err);
		})
	}

	ctrl.init();

}



angular.module('promocodeDetails')
	.component('promocodeDetails',{
		templateUrl: 'admin/promocode/promocode-details/promocode-details.template.html',
		controller:['$rootScope','$state','$http','$uibModal', PromoCodeDetailsController]
	});