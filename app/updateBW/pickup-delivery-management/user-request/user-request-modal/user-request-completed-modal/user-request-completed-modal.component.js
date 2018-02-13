(function(angular) {
'use strict';

function UserRequestCompletedModalController($state,UserRequestService,DriverService) {
    var ctrl = this;
    ctrl.timeslots = (ctrl.resolve && ctrl.resolve.details) || {};
    ctrl.init = function(){
        
        DriverService.getAllDrivers()
           .then(function (response) {
               ctrl.drivers = response.data;
        });
    };

    ctrl.cancel = function(){
        ctrl.modalInstance.close();
    }
    ctrl.init();
}

angular.module('userRequestCompleteModal')
    .component('userRequestCompleteModal',{
        templateUrl: 'pickup-delivery-management/user-request/user-request-modal/user-request-completed-modal/user-request-completed-modal.template.html',
        controller:['$state','UserRequestService','DriverService', UserRequestCompletedModalController],
        bindings:{
            modalInstance: '<',
            resolve: '<'
        }
    });

})(window.angular);