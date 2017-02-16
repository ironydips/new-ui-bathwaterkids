// 'use strict';


  describe('Unit testing', function () {

  	var $state, $stateParams, $http, $uibModal, service;
   
	beforeEach(module('ngResource',	function($provide){
		$provide.value('testValue', 45);
	}) 
	);
	it('tests', function(){
		expect(true).toBe(true);
	});

	it('should include dependencies', inject(function($resource, testValue){
		expect($resource).toBeDefined();
		expect(testValue).toBe(45);
	}));
	beforeEach(module('manageAdmin'));
	beforeEach(module('bathwaterApp.services'));
	 beforeEach(module(function($provide){
     AdminRightsServiceMock = {};        
    $provide.value('AdminRightsService', AdminRightsServiceMock);
  }));
	it('admin manager controller', inject(function($rootScope, $componentController,AdminRightsService){
		var $scope = $rootScope.$new();
		service = AdminRightsService;

		var ctrl = $componentController('manageAdmin',
		{	
			$scope: $scope,
			$state: $state,
			$stateParams: $stateParams,
			$http: $http,
			$uibModal: $uibModal,
			AdminRightsService: service

		});
		expect(ctrl).toBeDefined();
	}));

 });

  // describe('true',function(){
// var $componentController, controller;
// beforeEach(module('manageAdmin'));
// 	beforeEach(inject(function($injector){
// 		$componentController = $injector.get('$componentController');
// 	controller = $componentController('manageAdmin');

// 	}));

// it('initial count 0', function(){

// 	expect(controller).toBeDefined();
// });

// });
// describe('Component: myComponent', function () {
// 	var MyController;
//   var $scope;
//   beforeEach(module('manageAdmin'));
 
   
//   // Initialize the controller and a mock scope.
//   beforeEach(inject(function($rootScope, $controller) {
//     $scope = $rootScope.$new();
//     MyController = $controller('manageAdmin', {
//       $scope: $scope
//     });
//      it('should expose a `manageAdmin` object', function() {
//  	expect(MyController).toBeDefined();
//   });
//     //  createController = function() {
//     //     return $controller('manageAdmin', {
//     //        $scope : scope
//     //     });
//     // };
//   }));
     // var $scope, practiceCtrl;

        // // load the controller's module
        // beforeEach(function () {
        //     // Load the controller's module
        //     module('manageAdmin');

        //     inject(function ($controller, $rootScope) {
        //         $scope = $rootScope.$new();
        //         practiceCtrl = $controller("manageAdmin", {
        //             $scope: $scope
        //         });
        //     });
        //     it('should define a practice property', function () {
        //     expect(practiceCtrl.count).toBe(0);
        // });

        // });
//           var $componentController,$scope;

//   beforeEach(module('manageAdmin'));
//   beforeEach(inject(function($rootScope, _$componentController_){
//     $scope = $rootScope.$new();
//     $componentController = _$componentController_;
//     controller = $componentController('manageAdmin', {$scope:scope});
//     it('should expose a `hero` object', function() {
//     	console.log(controller);
//     // Here we are passing actual bindings to the component
//     //var ctrl = $componentController('manageAdmin', {$scope: $scope});

//     expect(controller).toBeDefined();
//   });
// }));

// });
