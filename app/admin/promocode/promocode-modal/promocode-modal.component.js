'use strict';
function PromoModalModalController($rootScope,$state,$http){
	var ctrl = this;
	ctrl.promo = (ctrl.resolve && ctrl.resolve.detailsofPromo) || {};
	ctrl.isDisabled = Object.keys(ctrl.promo).length > 0;

	ctrl.save = function(promocode){            
		$http({
			url: '/rest/uploadPromoFile/' + promocode,
            method: "POST",
            data: ctrl.promo,
            transformRequest: function(obj) {
		        var str = [];
		        for(var p in obj)
		        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    },
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4=",
                "Content-Type": "application/x-www-form-urlencoded"
            }
		})
		.then(function(result){
			ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error Adding Driver');
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
		controller:['$rootScope','$state','$http', PromoModalModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});