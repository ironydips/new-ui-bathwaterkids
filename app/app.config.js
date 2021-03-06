'use strict';

angular.
module('bathwaterApp').
config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'ngToastProvider',
    function config($urlRouterProvider, $stateProvider, $httpProvider, ngToast) {

        //HTTP Provider Config
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('InterceptorService');

        //ngToast Provider Config
        ngToast.configure({

            className: 'success',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            dismissButton: true,
            timeout: 900,


        });

        // UI-Routing Config
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('gSignIn', {
                url: '/',
                template: '<g-sign></g-sign>'
            })
            .state('manageAdmin', {
                url: '/manageAdmin',
                template: '<manage-admin></manage-admin>',
            })
            .state('index', {
                url: '/index',
                params: { key: null },
                template: '<index></index>'
            })
            .state('adminLayout', {
                url: '/admin',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@adminLayout': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@adminLayout': {
                        template: '<admin-sub-panel></admin-sub-panel>'
                    }
                }
            })
            .state('adminLayout.drivers', {
                url: '/drivers',
                // params:{key : null},
                views: {
                    'contentSection@adminLayout': {
                        template: '<driver-details></driver-details>'
                    }
                }
            })
            .state('adminLayout.trucks', {
                url: '/trucks',
                views: {
                    'contentSection@adminLayout': {
                        template: '<truck-details></truck-details>'
                    }
                }
            })
            .state('adminLayout.timeslot', {
                url: '/timeslot',
                views: {
                    'contentSection@adminLayout': {
                        template: '<timeslot-details></timeslot-details>'
                    }
                }
            })
            .state('adminLayout.zipCodes', {
                url: '/zipCodes',
                views: {
                    'contentSection@adminLayout': {
                        template: '<zipcode-details></zipcode-details>'
                    }
                }
            })
            .state('adminLayout.promoCode', {
                url: '/promoCode',
                views: {
                    'contentSection@adminLayout': {
                        template: '<promocode-details></promocode-details>'
                    }
                }
            })
            .state('deliveryLayout', {
                url: '/delivery',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@deliveryLayout': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@deliveryLayout': {
                        template: '<delivery-sub-panel></delivery-sub-panel>'
                    }
                }
            })
            .state('deliveryLayout.userRequests', {
                url: '/userRequests',
                // params:{key: null},
                views: {
                    'contentSection@deliveryLayout': {
                        template: '<user-request></user-request>'
                    }
                }
            })
            .state('deliveryLayout.trucks', {
                url: '/deliveryLayoutTrucks',
                views: {
                    'contentSection@deliveryLayout': {
                        template: '<delivery-trucks></delivery-trucks>'
                    }
                }
            })
            .state('customers', {
                url: '/customers',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@customers': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@customers': {
                        template: '<customers-sub-panel></customers-sub-panel>'
                    }
                }
            })
            .state('customers.user', {
                url: '/user',
                views: {
                    'contentSection@customers': {
                        template: '<customers-user></customers-user>'
                    }
                }
            })
            .state('customers.memberships', {
                url: '/memberships',
                views: {
                    'contentSection@customers': {
                        template: '<customers-membership></customers-membership>'
                    }
                }
            })
            .state('inventory', {
                url: '/inventory',
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@inventory': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@inventory': {
                        template: '<inventory-sub-panel></inventory-sub-panel>'
                    }

                }
            })
            .state('inventory.allinventories', {
                url: '/allinventories',
                views: {
                    'contentSection@inventory': {
                        template: '<allinventories-details></allinventories-details>'
                    }
                }
            })
            .state('inventory.inventoryIncoming', {
                url: '/inventoryIncoming',
                views: {
                    'contentSection@inventory': {
                        template: '<inventory-incoming-details></inventory-incoming-details>'
                    }
                }
            })
            .state('inventory.inventoryOutcoming', {
                url: '/inventoryOutcoming',
                views: {
                    'contentSection@inventory': {
                        template: '<outcoming-inventory-details></outcoming-inventory-details>'
                    }
                }
            })
            .state('inventory.inventoryRejected', {
                url: '/rejected',
                views: {
                    'contentSection@inventory': {
                        template: '<inventory-rejected-details></inventory-rejected-details>'
                    }
                }
            })
            .state('inventory.viewInventory', {
                url: '/items',
                views: {
                    'contentSection@inventory': {
                        template: '<inventory-stored-records-details></inventory-stored-records-details>'
                    }
                }
            })
            .state('inventory.swapped', {
                url: '/swapped',
                views: {
                    'contentSection@inventory': {
                        template: '<swapped-details></swapped-details>'
                    }
                }
            })
            .state('warehouse', {
                url: '/warehouse',
                abstract: true,
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@warehouse': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@warehouse': {
                        template: '<warehouse-sub-panel></warehouse-sub-panel>'
                    }
                }
            })
            // .state('warehouse.incomingWarehouse', {
            //     url: '/incomingWarehouse',
            //     views: {
            //         'contentSection@warehouse': {
            //             template: '<incoming-warehouse-details></incoming-warehouse-details>'
            //         }
            //     }
            // })
            // .state('warehouse.newIncomingWarehouse', {
            //     url: '/newIncomingWarehouse',
            //     views: {
            //         'contentSection@warehouse': {
            //             template: '<new-incoming-warehouse-details></new-incoming-warehouse-details>'
            //         }
            //     }
            // })
            // .state('warehouse.outgoingWarehouse', {
            //     url: '/outgoingWarehouse',
            //     views: {
            //         'contentSection@warehouse': {
            //             template: '<outgoing-warehouse-details></outgoing-warehouse-details>'
            //         }
            //     }
            // })
            // .state('warehouse.mergedIncomingWarehouse', {
            //     url: '/mergedIncomingWarehouse',
            //     views: {
            //         'contentSection@warehouse': {
            //             template: '<merged-incoming-warehouse-details></merged-incoming-warehouse-details>'
            //         }
            //     }
            // })
            // .state('warehouse.newOutgoingWarehouse', {
            //     url: '/newOutgoingWarehouse',
            //     views: {
            //         'contentSection@warehouse': {
            //             template: '<new-outgoing-warehouse-details></new-outgoing-warehouse-details>'
            //         }
            //     }
            // })
            .state('warehouse.truckItemIncomingWarehouse', {
                url: '/truckItemIncomingWarehouse',
                views: {
                    'contentSection@warehouse': {
                        template: '<truck-item-incoming-warehouse-details></truck-item-incoming-warehouse-details>'
                    }
                }
            })
            .state('warehouse.truckItemOutgoingWarehouse', {
                url: '/truckItemOutgoingWarehouse',
                views: {
                    'contentSection@warehouse': {
                        template: '<truck-item-outgoing-warehouse-details></truck-item-outgoing-warehouse-details>'
                    }
                }
            })
            .state('history', {
                url: '/history',
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@history': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@history': {
                        template: '<history-sub-panel></history-sub-panel>'
                    }

                }
            })
            .state('history.historyUserRequest', {
                url: '/userRequests',
                views: {
                    'contentSection@history': {
                        template: '<history-user-req-details></history-user-req-details>'
                    }
                }
            })
            .state('uploadExcel', {
                url: '/uploadExcel',
                views: {
                    '': {
                        template: '<admin-layout></admin-layout>'
                    },
                    'adminPanel@uploadExcel': {
                        template: '<admin-panel></admin-panel>'
                    },
                    'adminSubPanel@uploadExcel': {
                        template: '<upload-excel-sub-panel></upload-excel-sub-panel>'
                    }

                }
            })
            .state('uploadExcel.viewAddExcel', {
                url: '/viewExcel',
                views: {
                    'contentSection@uploadExcel': {
                        template: '<upload-excel-details></upload-excel-details>'
                    }
                }
            })
    }

]);
