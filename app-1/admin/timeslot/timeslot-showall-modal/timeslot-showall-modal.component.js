(function(angular) {
'use strict';

function TimeslotShowAllModal($rootScope, $state, TimeslotService) {
    var ctrl = this;

    TimeslotService.getTimeslots()
        .then(function(timeslotShowAllModal) {
        ctrl.alltimeslot = timeslotShowAllModal.data;
    });
    ctrl.cancelshowall= function(){
		ctrl.modalInstance.close();
    };
}

angular.module('timeslotShowAllModal')
    .component('timeslotShowAllModal', {
        templateUrl: 'admin/timeslot/timeslot-showall-modal/timeslot-showall-modal.template.html',
        controller: ['$rootScope', '$state','TimeslotService', TimeslotShowAllModal],
        bindings: {
            modalInstance: '<'
        }
    });
})(window.angular);
