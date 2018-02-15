(function(angular) {
    'use strict';


    function openPopUpCompleted(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'userRequestCompleteModal',
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

    function openPopUpnotstarted(details, drivers) {

        var popUpCtrl = this;

        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'userRequestNotStartedModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});

                },
                drivers: function() {
                    return (drivers || {})
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //popUpCtrl.loader = false;
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in user-request-notStarted Modal');
                console.log(err);
            }
    };

    function openPopUpinProgress(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'userRequestInProgressModal',
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
                console.log('Error in user-request-inProgress Modal');
                console.log(err);
            }
    };

    function UserRequestController($state, $uibModal, UserRequestService, DriverService, $q) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.completeRequest = [];
        ctrl.inProgressRequest = [];
        ctrl.notstartedRequest = [];
        ctrl.loader = true;

        ctrl.init = function() {
            $q.all([UserRequestService.getUserList(), DriverService.getAllDrivers()])
                .then(function(response) {
                    ctrl.loader = false;
                    ctrl.timeslots = response[0].data;
                    ctrl.drivers = response[1].data;
                    if (ctrl.timeslots && ctrl.timeslots.length && ctrl.drivers && ctrl.drivers.length) {
                        ctrl.completeRequest = ctrl.timeslots.filter(function(data) {
                            return data.status == "completed";
                        });
                        ctrl.inProgressRequest = ctrl.timeslots.filter(function(data) {
                            return data.status == "in progress";
                        });
                        ctrl.notstartedRequest = ctrl.timeslots.filter(function(data) {
                            return data.status == "not started";
                        });
                    } else {
                        ctrl.loader = false;
                    }




                })
                .catch(function(err) {
                    console.log('Error User Request/Driver Service..')
                });
        };

        ctrl.complete = function() {
            angular.bind(ctrl, openPopUpCompleted, ctrl.completeRequest)();
        };
        ctrl.notstarted = function() {
            //ctrl.loader = true;
            angular.bind(ctrl, openPopUpnotstarted, ctrl.notstartedRequest, ctrl.drivers)();
        };
        ctrl.inprogress = function() {
            angular.bind(ctrl, openPopUpinProgress, ctrl.inProgressRequest)();
        };

        ctrl.init();
    }

    angular.module('userRequest')
        .component('userRequest', {
            templateUrl: 'pickup-delivery-management/user-request/user-request-details/user-request.template.html',
            controller: ['$state', '$uibModal', 'UserRequestService', 'DriverService', '$q', UserRequestController]
        });
})(window.angular);
