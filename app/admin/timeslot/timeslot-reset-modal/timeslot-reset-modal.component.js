(function(angular) {
    'use strict';

    function TimeslotResetModalController($state, moment, TimeslotService) {
        var ctrl = this;
        ctrl.timeslot = (ctrl.resolve && ctrl.resolve.details) || { days: {}, timeslots: {}, availables: {}, isDisabled : false };

        ctrl.save = function() {
            ctrl.loader = true;
            var today = moment(ctrl.timeslot.endDate, "MM.DD.YYYY", true);
            ctrl.timeslot.until = today.add(1, 'days').format("MM.DD.YYYY");
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
            return moment().format("MM.DD.YYYY");
        };

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