'use strict';

angular.
  module('bathwaterApp').
  config(['$urlRouterProvider' ,'$stateProvider', '$httpProvider',
    function config($urlRouterProvider, $stateProvider, $httpProvider) {

      //HTTP Provider Config
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.interceptors.push('InterceptorService');

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
          abstract: true,
          views:{
            '':{
              template:'<admin-layout></admin-layout>'
            },
            'adminPanel@adminLayout':{
              template:'<admin-panel></admin-panel>'
            },
            'adminSubPanel@adminLayout':{
              template:'<admin-sub-panel></admin-sub-panel>'
            }
          }
        })
        .state('adminLayout.drivers',{
          url:'/drivers',
          views:{
            'contentSection@adminLayout':{
              template:'<driver-details></driver-details>'
            }
          }
        })
        .state('adminLayout.trucks',{
          url:'/truks',
          views:{
            'contentSection@adminLayout':{
              template:'<truck-details></truck-details>'
            }
          }
        })
        .state('adminLayout.timeslot',{
        url:'/timeslot',
        views:{
            'contentSection@adminLayout':{
              template:'<timeslot-details></timeslot-details>'
            }
          }
        })
        .state('adminLayout.zipCodes',{
        url:'/zipCodes',
        views:{
            'contentSection@adminLayout':{
              template:'<zipcode-details></zipcode-details>'
            }
          }
        })
        .state('adminLayout.promoCode',{
          url:'/promoCode',
          views:{
            'contentSection@adminLayout':{
              template:'<promocode-details></promocode-details>'
            }
          }
        })
    }
  ]);
