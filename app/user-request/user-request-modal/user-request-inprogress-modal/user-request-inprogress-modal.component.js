(function(angular) {
'use strict';

function UserRequestInProgressModalController($scope, $rootScope,$state,$http) {
	var ctrl = this;
	ctrl.inprogress = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.inprogress).length > 0;
	ctrl.init = function(){
		$http({
        url: "/rest/getUserTS",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4=",
            'Content-Type':'application/json'
        },
        method: "GET"
    }).then(function (uqinprogress) {
        ctrl.timeslotIP = uqinprogress.data;
    });
	};
	ctrl.listofdriver = function(){
		 $http({
        url: "/rest/getAllDrivers",
        method: "GET",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4="
        }
    })
            .then(function (response) {
               ctrl.drivers = response.data;
            });
	}
	 ctrl.assignDriver = function (reqId, driverID) {
        $http({
            url: '/rest/assignDriverToUserRequest/' + driverID + '?userReqID=' + reqId,
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': "Basic YWRtaW46YWRtaW4="
            },
            method: "GET"
        }).then(function () {
            window.location.reload();
        });
    };


	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	ctrl.init();
	ctrl.listofdriver();
}

angular.module('userRequestInProgressModal')
	.component('userRequestInProgressModal',{
		templateUrl: 'user-request/user-request-modal/user-request-inprogress-modal/user-request-inprogress-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', UserRequestInProgressModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);