(function(angular) {
    'use strict';

    function TimeslotModalController($state, moment, TimeslotService) {
        var ctrl = this;
        ctrl.timeslot = (ctrl.resolve && ctrl.resolve.details) || { days: {}, timeslots: {}, availables: {}, isDisabled: false };

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

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };
        ctrl.currDate = function() {
        	return moment().format("MM.DD.YYYY");
        }
    }

    angular.module('timeslotModal')
        .component('timeslotModal', {
            templateUrl: 'admin/timeslot/timeslot-modal/timeslot-modal.template.html',
            controller: ['$state', 'moment', 'TimeslotService', TimeslotModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular)
