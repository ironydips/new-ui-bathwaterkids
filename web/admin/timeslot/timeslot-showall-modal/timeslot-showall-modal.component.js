'use strict';

function TimeslotShowAllModal($rootScope, $state, $http) {
    var ctrl = this;
    $http({
        url: '/rest/getTimeslots',
        method: "GET",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4="
        }
    }).then(function(timeslotShowAllModal) {
        ctrl.alltimeslot = timeslotShowAllModal.data;
    });
    ctrl.cancelshowall= function(){
		ctrl.modalInstance.close();
    };
}

angular.module('timeslotShowAllModal')
    .component('timeslotShowAllModal', {
        templateUrl: 'admin/timeslot/timeslot-showall-modal/timeslot-showall-modal.template.html',
        controller: ['$rootScope', '$state', '$http', TimeslotShowAllModal],
        bindings: {
            modalInstance: '<'
        }
    });