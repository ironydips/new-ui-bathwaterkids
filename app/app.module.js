'use strict';

// Define the `bathwaterApp` module
angular.module('bathwaterApp', [
	'ui.router',
	'angular-google-gapi',
	'ngMessages',
	'googleSignIn',
	'naif.base64',
	'index',
	'header',
	'adminLayout',
	'adminPanel',
	'adminSubPanel',
	'driversTab',
	'driverDetails',
	'addDriver',
	'trucksTab',
	'truckDetails',
	'addTruck',
]);
