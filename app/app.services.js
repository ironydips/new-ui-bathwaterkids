angular.module('bathwaterApp')
	.factory('InterceptorService',['$cookies', function ($cookies) {
		var object;

		object = {
			'request': function(config){

				//Adding base URL to the Request object
				if(["GET","POST"].indexOf(config.method) > -1 && !config.url.includes('.html')){
					config.url = angular.config.baseUrl + config.url;
					if(config.url.indexOf('gloginsuccess') == -1){
						var token = $cookies.get('token');
						token && config.headers && (config.headers.token = token);
					}
				}

				return config;
			},
			'requestError':function(rejection){
				return rejection;
			},
			'response': function(response){
				//check for any error

				//update headers

				return response;
			},
			'responseError': function(rejection){
				// go to home page for re-login on any error.
				window.location.href = '/';
			}
		}

		return object;
	}]);