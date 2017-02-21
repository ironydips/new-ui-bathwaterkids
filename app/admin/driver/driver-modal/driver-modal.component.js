(function(angular) {
'use strict';

function DriverModalController($rootScope,$state, $http) {
	var ctrl = this;

	ctrl.driver = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.driver).length > 0;

	ctrl.save = function(){        
		$http({
			url: '/rest/addDriver',
            method: "POST",
            data: ctrl.driver,
            transformRequest: function(obj) {
		        var str = [];
		        for(var p in obj)
		        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        return str.join("&");
		    },
            headers: {
                'Authorization': "Basic YWRtaW46YWRtaW4=",
                "Content-Type": "application/x-www-form-urlencoded"
            }
		})
		.then(function(result){
			ctrl.modalInstance.close('update');


		})
		.catch(function(err){
			console.log('Error Adding Driver');
			console.log(err);
		});
	}
	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('driverModal')
	.component('driverModal',{
		templateUrl: 'admin/driver/driver-modal/driver-modal.template.html',
		controller:['$rootScope','$state','$http', DriverModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);