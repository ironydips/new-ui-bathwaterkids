'use strict';

// Define the `bathwaterApp` module
angular.module('bathwaterApp', [
	'ui.router',
	'angular-google-gapi',
	'ngMessages',
	'googleSignIn',
	'naif.base64',
	'ui.bootstrap',
	'images-resizer',
	'720kb.datepicker',
	'ngAnimate',
	'ngSanitize',
	// For Notification
	'ngToast',
	'ngCookies',
	//LightBox Library used as Image Viewer.
	'angularMoment', //moment.js for date formatting
	'bootstrapLightbox',
	'xlsx-model',
	'manageAdmin',
	'index',
	'adminLayout',
	'adminPanel',
	// Common Module
	'bathwaterApp.common',
	'bathwaterApp.services',
	// Admin Panel Modules
	'adminSubPanel',
	'driverDetails',
	'truckDetails',
	'timeslotDetails',
	'zipcodeDetails',
	'promocodeDetails',
	// Pickup/Delivery Panel Modules
	'deliverySubPanel',
	'userRequest',
	'deliveryTrucks',
	//Customer Panel Modules
	'customersSubPanel',
	//Inventory Panel Module
	'inventorySubPanel',
	'inventoryIncomingDetails',
	'inventoryRejectedDetails',
	'inventoryStoredRecordsDetails',
	//Warehouse Module
	'warehouseSubPanel',
	'incomingWarehouseDetails',
	'newIncomingWarehouseDetails',
	'mergedIncomingWarehouseDetails',
	'outgoingWarehouseDetails',
	'newOutgoingWarehouseDetails',
	'truckItemIncomingWarehouseDetails',
	'truckItemOutgoingWarehouseDetails',
	'historySubPanel',
	'historyUserReqDetails',
	'uploadExcelSubPanel',
	'uploadExcelDetails'
]);
