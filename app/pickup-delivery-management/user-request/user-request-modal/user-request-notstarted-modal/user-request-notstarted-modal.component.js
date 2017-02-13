(function(angular) {
'use strict';

function UserRequestNotStartedModalController($scope, $rootScope,$state,$http) {
	var ctrl = this;
	ctrl.notstarted = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.init = function(){
		$http({
        url: "/rest/getUserTS",
        headers: {
            'Authorization': "Basic YWRtaW46YWRtaW4=",
            'Content-Type':'application/json'
        },
        method: "GET"
    }).then(function (ureqnotstarted) {
        ctrl.timeslotNS = ureqnotstarted.data;
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

	ctrl.assignDriver = function (reqId, dr) {
		var updatedDriverDetails = angular.fromJson(dr.selectedDriver);
		$http({
            url: '/rest/assignDriverToUserRequest/' + updatedDriverDetails.driverID + '?userReqID=' + reqId,
            headers: {
                'Content-Type': 'text/plain',
                'Authorization': "Basic YWRtaW46YWRtaW4="
            },
            method: "GET"
        }).then(function (response) {
        	if(response.data.response == "success"){
        		dr.driver = dr.driver || {};

        	dr.driver.firstName = updatedDriverDetails.firstName;
        	dr.driver.lastName = updatedDriverDetails.lastName;
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

angular.module('userRequestNotStartedModal')
	.component('userRequestNotStartedModal',{
		templateUrl: 'pickup-delivery-management/user-request/user-request-modal/user-request-notstarted-modal/user-request-notstarted-modal.template.html',
		controller:['$scope','$rootScope','$state','$http', UserRequestNotStartedModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});

})(window.angular);