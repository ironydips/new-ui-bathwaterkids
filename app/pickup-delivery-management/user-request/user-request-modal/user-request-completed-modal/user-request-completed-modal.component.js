(function(angular) {
'use strict';

function UserRequestCompletedModalController($scope, $rootScope,$state,$http) {
	var ctrl = this;
	ctrl.complete = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.complete).length > 0;
	ctrl.init = function(){
		$http({
        url: "/rest/getUserTS",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4=",
            'Content-Type':'application/json'
        },
        method: "GET"
    }).then(function (uqcompleted) {
        ctrl.timeslots = uqcompleted.data;
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
	 ctrl.assignDriver = function (reqId, drC) {
	 	var updatedDriverC = angular.fromJson(drC.selecteddriverC);

        $http({
            url: '/rest/assignDriverToUserRequest/' + updatedDriverC.driverID + '?userReqID=' + reqId,
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': "Basic YWRtaW46YWRtaW4="
            },
            method: "GET"
        }).then(function (response) {
        		if(response.data.response == "success"){
        		drC.driver = drC.driver || {};
        		drC.driver.firstName = updatedDriverC.firstName;
        	    drC.driver.lastName = updatedDriverC.lastName;
        	}else{
        		console.log("Invalid driver");

        	}
        });
    };


	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
	ctrl.init();
	ctrl.listofdriver();
}

angular.module('userRequestCompleteModal')
	.component('userRequestCompleteModal',{
		templateUrl: 'pickup-delivery-management/user-request/user-request-modal/user-request-completed-modal/user-request-completed-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', UserRequestCompletedModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);