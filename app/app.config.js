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
        .state('manageAdmin',{
          url:'/manageAdmin',
          template: '<manage-admin></manage-admin>',
        })
        .state('index',{
          url:'/index',
          params:{ key : null},
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
          // params:{key : null},
          views:{
            'contentSection@adminLayout':{
              template:'<driver-details></driver-details>'
            }
          }
        })
        .state('adminLayout.trucks',{
          url:'/trucks',
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
        .state('deliveryLayout',{
          url:'/delivery',
          abstract: true,
          views:{
            '':{
              template:'<admin-layout></admin-layout>'
            },
            'adminPanel@deliveryLayout':{
              template:'<admin-panel></admin-panel>'
            },
            'adminSubPanel@deliveryLayout':{
              template:'<delivery-sub-panel></delivery-sub-panel>'
            }
          }
        })
        .state('deliveryLayout.userRequests',{
          url:'/userRequests',
          // params:{key: null},
          views:{
            'contentSection@deliveryLayout':{
              template:'<user-request></user-request>'
            }
          }
        })
        .state('deliveryLayout.trucks',{
          url: '/deliveryLayoutTrucks',
          views:{
            'contentSection@deliveryLayout':{
              template:'<delivery-trucks></delivery-trucks>'
            }          }
        })
        .state('customers',{
          url:'/customers',
          abstract: true,
          views:{
            '':{
              template:'<admin-layout></admin-layout>'
            },
            'adminPanel@customers':{
              template:'<admin-panel></admin-panel>'
            },
            'adminSubPanel@customers':{
              template:'<customers-sub-panel></customers-sub-panel>'
            }
          }
        })
        .state('customers.user',{
          url:'/user',
          views:{
            'contentSection@customers':{
              template:'<customers-user></customers-user>'
            }
          }
        })
        .state('customers.memberships',{
          url:'/memberships',
          views:{
            'contentSection@customers':{
              template:'<customers-membership></customers-membership>'
            }
          }
        })
        .state('inventory',{
          url:'/inventory',
          views:{
             '':{
              template:'<admin-layout></admin-layout>'
            },
            'adminPanel@inventory':{
              template:'<admin-panel></admin-panel>'
            },
            'adminSubPanel@inventory':{
              template:'<inventory-sub-panel></inventory-sub-panel>'
            }

          }
        })
         .state('inventory.allinventories',{
          url:'/allinventories',
          views:{
            'contentSection@inventory':{
              template:'<allinventories-details></allinventories-details>'
            }
          }
        })
          .state('inventory.incoming',{
          url:'/incoming',
          views:{
            'contentSection@inventory':{
              template:'<incoming-details></incoming-details>'
            }
          }
        })
           .state('inventory.outcoming',{
          url:'/outcoming',
          views:{
            'contentSection@inventory':{
              template:'<outcoming-details></outcoming-details>'
            }
          }
        })
             .state('inventory.swapped',{
          url:'/swapped',
          views:{
            'contentSection@inventory':{
              template:'<swapped-details></swapped-details>'
            }
          }
        })
    }
  ]);
