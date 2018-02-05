(function(angular) {
'use strict';

function UserRequestInProgressModalController($state,$uibModal,UserRequestService,DriverService) {
    var ctrl = this;
    ctrl.$uibModal = $uibModal;
    ctrl.inprogress = (ctrl.resolve && ctrl.resolve.details) || {};

    ctrl.init = function(){

        UserRequestService.getUserList()
                .then(function (uqinprogress) {
                ctrl.timeslotIP = uqinprogress.data;
            });

        DriverService.getAllDrivers()
            .then(function (response) {
               ctrl.drivers = response.data;
            });
    };

    ctrl.assignDriver = function (reqId, drIP) {
        var updatedDriverInP = angular.fromJson(drIP.selecteddriverP);
        UserRequestService.assignDriver(reqId,updatedDriverInP)
            .then(function (response) {
                if(response.data.response == "success"){
                    drIP.driver = drIP.driver || {};
                    drIP.driver.firstName = updatedDriverInP.firstName;
                    drIP.driver.lastName = updatedDriverInP.lastName;
                }else{
                    console.log("Invalid driver");

                }
            });
    };

    ctrl.pickUp = function(details) {
        angular.bind(ctrl, openPopUpPickUp, details)();
    };

    ctrl.cancel = function(){
        ctrl.modalInstance.close();
    }

    function openPopUpPickUp(details) {
        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'userRequestPickUpModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in user-request-completed Modal');
                console.log(err);
            }
    };
    
    ctrl.init();
}

angular.module('userRequestInProgressModal')
    .component('userRequestInProgressModal',{
        templateUrl: 'pickup-delivery-management/user-request/user-request-modal/user-request-inprogress-modal/user-request-inprogress-modal.template.html',
        controller:['$state', '$uibModal','UserRequestService','DriverService', UserRequestInProgressModalController],
        bindings:{
            modalInstance: '<',
            resolve: '<'
        }
    });

})(window.angular);