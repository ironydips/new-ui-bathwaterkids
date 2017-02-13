(function(angular) {
	"use strict";

	function BathwaterController($router){
		var ctrl = this;

		$router.config([
			{ path: '', pathMatch: 'full', redirectTo: '/index' },
	        { path: '/index', component: index }
		]);
	}

	// BathwaterController.$routerConfig([
	// 		{
	//           path: '',
	//           pathMatch: 'full',
	//           redirectTo: '/index'
	//         },
	//         {
	//           path: '/index',
	//           component: 'index'
	//         }
	// 	]);

	angular.module('bathwaterApp')
		.controller('BathwaterController', ['$router', BathwaterController])
})(window.angular);