(function(angular) {

    'use strict';

    function addTimeslotPopUp(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'timeslotModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || { days: {}, timeslots: {}, availables: {} });
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in add-timeslot Modal');
                console.log(err);
            }

    }

    function opentimeslotResetModal(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'timeslotResetModal',
            windowClass: 'app-modal-window-small',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details);
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in add-timeslot Modal');
                console.log(err);
            }

    }

    function openEditDeleteTSModal(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'editDeleteTSModal',
            windowClass: 'app-modal-window-small',
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
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in add-timeslot Modal');
                console.log(err);
            }

    }

    function showTimeslotPopup(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'timeslotShowAllModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if(data == "update") this.$state.reload();

            }),
            function(err) {
                console.log('Error in show-timeslot Modal');
                console.log(err);
            }

    }


    function TimeslotController($state, $uibModal, moment, TimeslotService) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;
        ctrl.todayDate;

        ctrl.init = function() {
            ctrl.loader = true;
            ctrl.todayDate = moment().format("MM.DD.YYYY");
            ctrl.getTimeslotsForTheWeek(ctrl.todayDate);
        };

        //Add Timeslot
        ctrl.addTimeslot = function() {

            angular.bind(ctrl, addTimeslotPopUp, null)();
        };
        ctrl.editDelete = function(count) {
            angular.bind(ctrl, openEditDeleteTSModal, angular.copy(count))();
        }
        ctrl.resetTimeslot = function() {
                var slots = {
                    days: { Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: true, Sun: true },
                    timeslots: { s0: true, s1: true, s2: true, s3: true, s4: true, s5: true, s6: true, s7: true, s8: true },
                    availables: { s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0, s9: 0 },
                    isDisabled: true
                };
                angular.bind(ctrl, opentimeslotResetModal, slots)();
            }
            //Show Timeslot
        ctrl.showallTimeslot = function() {
            angular.bind(ctrl, showTimeslotPopup, null)();
        };

        ctrl.prevTimeslot = function() {
            ctrl.loader = true;
            var mDate = moment(ctrl.todayDate, "MM.DD.YYYY", true);
            ctrl.todayDate = mDate.add(-7, 'days').format("MM.DD.YYYY");
            ctrl.getTimeslotsForTheWeek(ctrl.todayDate);
        };
        ctrl.nextTimeslot = function() {
            ctrl.loader = true;
            var mDate = moment(ctrl.todayDate, "MM.DD.YYYY", true);
            ctrl.todayDate = mDate.add(7, 'days').format("MM.DD.YYYY");

            ctrl.getTimeslotsForTheWeek(ctrl.todayDate);
        };
        ctrl.getTimeslotsForTheWeek = function(date) {
            TimeslotService.getTimeslotsForTheWeek(date)
                .then(function(timeslotDetails) {
                    ctrl.loader = false;
                    timeslotDetails.data.timeslots.forEach(record => {
                        record.counts.forEach((count, index) => {
                            count.date = timeslotDetails.data.dateMap.entry[index];
                            count.time = record.time
                        })
                    })
                    ctrl.timeslots = timeslotDetails.data;
                })
                .catch(function(err) {
                    console.log('Error getting timeslot details:');
                    console.log(err);
                })
        }
        ctrl.init();
    }

    angular.module('timeslotDetails')
        .component('timeslotDetails', {
            templateUrl: 'admin/timeslot/timeslot-details/timeslot-details.template.html',
            controller: ['$state', '$uibModal', 'moment', 'TimeslotService', TimeslotController]
        });
})(window.angular);
