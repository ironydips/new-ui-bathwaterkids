(function(angular) {
	"use strict";
	
	function HistoryServiceHandler($http){

		
		var getUserReqByDate = function(date){
			return $http({
		            url: '/rest/getUserRequest/' + date,
		            method: "GET",
		            headers:{
	            		//"Authorization": 'Basic YWRtaW46YWRtaW4='
	            }
	        });
		};

		//EXPORTED Object
		return {
			getUserReqByDate
		}
	}

	angular.module('bathwaterApp.services')
		.factory('historyService',['$http',HistoryServiceHandler]);	

})(window.angular);