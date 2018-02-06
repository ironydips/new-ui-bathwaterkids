(function(angular) {
'use strict';

function customerAddItemModalController($state,UserRequestService,DriverService) {
    var ctrl = this;
    ctrl.requestDetails = (ctrl.resolve && ctrl.resolve.details) || {};
    ctrl.pickup = {};
    ctrl.pickedupItems = [];
    ctrl.isSubItem = false;

    ctrl.init = function(){
        
    };

    ctrl.cancel = function(){
        ctrl.modalInstance.close();
    }

    ctrl.addSubItem = function() {
        ctrl.isSubItem = true;
    }

    ctrl.save = function() {
        ctrl.pickup.userRequestID = ctrl.requestDetails.userRequestID;
        // ctrl.pickup.driverID = ctrl.requestDetails.driver.driverID;

        ctrl.data = {
            "userRequestID": ctrl.requestDetails.userRequestID,
            // "driverID": ctrl.requestDetails.driver.driverID,
            "pickedupItems": [
            {
                "itemCode": [
                        ctrl.itemCode
                    ],
                "productName": ctrl.productName,
                "brandName": ctrl.brandName,
                "condition": ctrl.condition,
                "eventualDamages": ctrl.eventualDamages,
                "sharable": ctrl.sharable,
                "imagesBase64": [
                        ctrl.file1
                    ],
                "subItems": [
                        {
                            "itemCode": "753",
                            "itemName": "abc",
                            "description": "sample"
                        }
                    ]
                }
            ],
            "bins": [
                    {
                        "binCode": '142',
                        "imageBase64": ctrl.file2
                    }
                ],
            "customerSignatureBase64": ctrl.file3
        };
        ctrl.loader = true;
        DriverService.pickup(ctrl.data)
            .then(function(result) {
                ctrl.loader = false;
                ctrl.modalInstance.close({ action: 'update' });
            })
            .catch(function(err) {
                console.log('Error Adding Driver');
                console.log(err);
            });
    };
    
    ctrl.init();
}

angular.module('customerAddItemModal')
    .component('customerAddItemModal',{
        templateUrl: 'customers/customer-add-item-modal/customer-add-item-modal.template.html',
        controller:['$state','UserRequestService','DriverService', customerAddItemModalController],
        bindings:{
            modalInstance: '<',
            resolve: '<'
        }
    });

})(window.angular);