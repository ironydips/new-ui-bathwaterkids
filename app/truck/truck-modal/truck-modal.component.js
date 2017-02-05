(function(angular) {
'use strict';

function TruckModalController($scope, $rootScope,$state,$http, resizeService) {
	var ctrl = this;
	ctrl.truck = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.truck).length > 0;
	if(ctrl.truck.images && ctrl.truck.images.length > 0){
		ctrl.imageUrl = ctrl.truck.images[0].url;
	}

	// Watch the image change and show from base 64 value
	// $scope is only used here for watch.
	$scope.$watch(angular.bind(this, function(){
		return this.selectedImage;
	}), function(value){
		value ? 
			(ctrl.imageUrl = 'data:image/jpeg;base64, ' + value.base64, ctrl.truck.truckImage = value.base64)
			: (ctrl.truck.truckImage = '');
	});

	ctrl.save = function(){
		$http({
			url: '/rest/addTruckwithImage',
            method: "POST",
            data: JSON.stringify(ctrl.truck),
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4=",
                'Content-Type': 'text/plain'
            }
		})
		.then(function(result){
			ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error Adding Truck');
			console.log(err);
		});
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('truckModal')
	.component('truckModal',{
		templateUrl: 'truck/truck-modal/truck-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', 'resizeService', TruckModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);