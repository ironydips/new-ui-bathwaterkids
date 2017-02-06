(function(angular) {
'use strict';

function ZipModalModalController($rootScope,$state, $http) {
	var ctrl = this;
	ctrl.zip = (ctrl.resolve && ctrl.resolve.details) || {};
	ctrl.isDisabled = Object.keys(ctrl.zip).length > 0;

	ctrl.save = function(){                  
		$http({
			url: '/rest/addZipCode',
            method: "POST",
            data: ctrl.zip,
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

angular.module('zipModal')
	.component('zipModal',{
		templateUrl: 'zipcode/zipcode-modal/zip-modal.template.html',
		controller:['$rootScope','$state','$http', ZipModalModalController],
		bindings:{
			modalInstance: '<',
			resolve: '<'
		}
	});
})(window.angular);