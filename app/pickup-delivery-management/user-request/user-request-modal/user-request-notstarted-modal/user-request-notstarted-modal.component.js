(function(angular) {
'use strict';

function UserRequestNotStartedModalController($state,UserRequestService,DriverService) {
    var ctrl = this;
    ctrl.notstarted = (ctrl.resolve && ctrl.resolve.details) || {};
    ctrl.init = function(){
        UserRequestService.getUserList()
          .then(function (ureqnotstarted) {
                ctrl.timeslotNS = ureqnotstarted.data;
            });

        DriverService.getAllDrivers()
            .then(function (response) {
               ctrl.drivers = response.data;
            });
       };

    ctrl.assignDriver = function (reqId, dr) {
        var updatedDriverDetails = angular.fromJson(dr.selectedDriver);
        UserRequestService.assignDriver(reqId,updatedDriverDetails)
        .then(function (response) {
                    if(response.data.response == "success"){
                        dr.driver = dr.driver || {};
                        dr.driver.firstName = updatedDriverDetails.firstName;
                        dr.driver.lastName = updatedDriverDetails.lastName;
                }else{
                   console.log("Invalid driver");
                }
            });
        };

    ctrl.cancel = function(){
        ctrl.modalInstance.close();
    };
    ctrl.init();
}

angular.module('userRequestNotStartedModal')
    .component('userRequestNotStartedModal',{
        templateUrl: 'pickup-delivery-management/user-request/user-request-modal/user-request-notstarted-modal/user-request-notstarted-modal.template.html',
        controller:['$state','UserRequestService','DriverService', UserRequestNotStartedModalController],
        bindings:{
            modalInstance: '<',
            resolve: '<'
        }
    });

})(window.angular);