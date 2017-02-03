'use strict';

angular.
  module('bathwaterApp').
  config(['$urlRouterProvider' ,'$stateProvider', '$httpProvider',
    function config($urlRouterProvider, $stateProvider, $httpProvider) {

      //HTTP Provider Config
      $httpProvider.defaults.useXDomain = true;
      // $httpProvider.interceptors.push('InterceptorService');

      // UI-Routing Config
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('gSignIn',{
          url:'/',
          template: '<g-sign></g-sign>'
        })
        .state('index',{
          url:'/index',
          template: '<index></index>'
        })
        .state('adminLayout',{
          url:'/admin',
          views:{
            '':{
              template:'<admin-layout></admin-layout>'
            },
            'header@adminLayout':{
              template:'<header></header>'
            },
            'adminPanel@adminLayout':{
              template:'<admin-panel></admin-panel>'
            },
            'adminSubPanel@adminLayout':{
              template:'<admin-sub-panel></admin-sub-panel>'
            },
            'contentTabs@adminLayout':{
              template:'<drivers-tab></drivers-tab>'
            },
            'contentSection@adminLayout':{
              template:'<driver-details></driver-details>'
            }
          }
        })
        .state('adminLayout.adminDrivers',{
          url:'/adminDrivers',
          views:{
            'contentTabs@adminLayout':{
              template:'<drivers-tab></drivers-tab>'
            },
            'contentSection@adminLayout':{
              template:'<driver-details></driver-details>'
            }
          }
        })
        .state('adminLayout.driverDetails',{
          url:'/drivers',
          views:{
            'contentSection@adminLayout':{
              template:'<driver-details></driver-details>'
            }
          }
        })
        .state('adminLayout.addDriver',{
          url:'/addDriver',
          views:{
            'contentSection@adminLayout':{
              template:'<add-driver></add-driver>'
            }
          }
        })
        .state('adminLayout.adminTrucks',{
          url:'/adminTrucks',
          views:{
            'contentTabs@adminLayout':{
              template:'<trucks-tab></trucks-tab>'
            },
            'contentSection@adminLayout':{
              template:'<truck-details></truck-details>'
            }
          }
        })
        .state('adminLayout.truckDetails',{
          url:'/trucks',
          views:{
            'contentTabs@adminLayout':{
              template:'<trucks-tab></trucks-tab>'
            },
            'contentSection@adminLayout':{
              template:'<truck-details></truck-details>'
            }
          }
        })
        .state('adminLayout.addTruck',{
          url:'/addTruck',
          views:{
            'contentTabs@adminLayout':{
              template:'<trucks-tab></trucks-tab>'
            },
            'contentSection@adminLayout':{
              template:'<add-truck></add-truck>'
            }
          }
        })
    }
  ]);
