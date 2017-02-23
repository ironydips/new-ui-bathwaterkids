(function(angular) {
'use strict';


function openPopUpCompleted(details){

	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'userRequestCompleteModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
		}), function(err){
			console.log('Error in user-request-completed Modal');
			console.log(err);
		}
};
function openPopUpnotstarted(details){

	var popUpCtrl = this;
	var modalInstance = popUpCtrl.$uibModal.open({
			component: 'userRequestNotStartedModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
		}), function(err){
			console.log('Error in user-request-notStarted Modal');
			console.log(err);
		}
};
function openPopUpinProgress(details){

		var popUpCtrl = this;
		var modalInstance = popUpCtrl.$uibModal.open({
			component: 'userRequestInProgressModal',
			windowClass: 'app-modal-window-large',
			keyboard: false,
			resolve:{
				details: function(){
					return (details || {});
				}
			},
			backdrop: 'static'
		});

		modalInstance.result.then(function(data){
			//data passed when pop up closed.
			//if(data == "update") this.$state.reload();
			
		}), function(err){
			console.log('Error in user-request-inProgress Modal');
			console.log(err);
		}
};

function UserRequestController($state, $uibModal) {
	var ctrl = this;
	ctrl.$uibModal = $uibModal;
	ctrl.$state = $state;

	ctrl.complete = function(){
		angular.bind(ctrl, openPopUpCompleted, null)();
	};
	ctrl.notstarted = function(){
		angular.bind(ctrl, openPopUpnotstarted, null)();
	};
	ctrl.inprogress = function(){
		angular.bind(ctrl, openPopUpinProgress, null)();
	};
	}

angular.module('userRequest')
	.component('userRequest',{
		templateUrl: 'pickup-delivery-management/user-request/user-request-details/user-request.template.html',
		controller:['$state', '$uibModal', UserRequestController]
	});
})(window.angular);