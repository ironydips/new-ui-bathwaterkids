(function(angular) {
'use strict';

function openPopUp(details){
	var modalInstance = this.$uibModal.open({
			component: 'zipModal',
			windowClass: 'app-modal-window-small',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(angular.bind(this, function(data){
			//data passed when pop up closed.
			if(data == "update") this.$state.reload();
			
		}), angular.bind(this, function(err){
			console.log('Error in add-driver Modal');
			console.log(err);
		})
		)
}

function ZipCodeDetailsController($rootScope, $state, $http, $uibModal) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.init = function(){
		//get driver details.
		$http({
		    url: '/rest/getZipCodes',
		    method: "GET",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(zipCodes){
			ctrl.zipCodes = zipCodes.data;
		})
		.catch(function(err){
			console.log('Error getting zipcode details:');
			console.log(err);
		})
	};

	ctrl.addZipCode = function(){
		angular.bind(ctrl, openPopUp, null)();
	};

	ctrl.deleteZipCode = function(zipcode){
		//Show alert and then delete if Yes.

		$http({
		    url: '/rest/deleteZipCode/' + zipcode,
		    method: "GET",
		    headers:{
		    	"Authorization": 'Basic YWRtaW46YWRtaW4='
		    }
		})
		.then(function(zipCodes){
			$state.reload();
		})
		.catch(function(err){
			console.log('Error getting zipcode details:');
			console.log(err);
		})
	}

	ctrl.init();
}

angular.module('zipcodeDetails')
	.component('zipcodeDetails',{
		templateUrl: 'admin/zipcode/zipcode-details/zipcode-details.template.html',
		controller:['$rootScope','$state','$http', '$uibModal', ZipCodeDetailsController]
	});
})(window.angular);