(function(angular) {
    'use strict';

    function TimeslotResetModalController($state, moment, TimeslotService) {
        var ctrl = this;
        ctrl.timeslot = (ctrl.resolve && ctrl.resolve.details) || { days: {}, timeslots: {}, availables: {}, isDisabled : false };

        ctrl.save = function() {
            ctrl.loader = true;
            var today = moment(ctrl.timeslot.endDate);
            ctrl.timeslot.until = moment(today).add(1, 'days').format("MM.DD.YYYY");
            TimeslotService.createTimeSlotsRange(ctrl.timeslot)
                .then(function(result) {
                    ctrl.loader = false;
                    ctrl.modalInstance.close({ action: "update" });
                })
                .catch(function(err) {
                    console.log('Error Timeslot detail');
                    console.log(err);
                });

        };

        ctrl.currDate = function() {
            var d = new Date();
            var date = ctrl.formateDate(d);
            return date;
        };
        ctrl.formateDate = function(date) {
            var date = ('0' + (date.getMonth() + 1)).slice(-2) + '.' + ('0' + date.getDate()).slice(-2) + '.' + date.getFullYear();
            return date;
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
    }

    angular.module('timeslotResetModal')
        .component('timeslotResetModal', {
            templateUrl: 'admin/timeslot/timeslot-reset-modal/timeslot-reset-modal.template.html',
            controller: ['$state', 'moment', 'TimeslotService', TimeslotResetModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular)