angular.module('bathwaterApp')
	.factory('InterceptorService',[function () {
		var object;

		object = {
			'request': function(config){
				config.headers["Authorization"] = "BASIC YWRtaW46YWRtaW4=";
				config.useXDomain = true;
				if(config.method == "POST"){
					config.headers["Content-Type"] = "application/x-www-form-urlencoded";
				}
				return config;
			},
			'requestError':function(rejection){
			},
			'response': function(response){
				return response;
			},
			'responseError': function(rejection){
			}
		}

		return object;
	}]);