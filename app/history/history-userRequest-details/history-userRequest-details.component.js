(function(angular) {
    'use strict';

    function openPopupUserDetail(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewUserDetailModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if (data && data.action == "update");
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in User Detail Modal');
                console.log(err);
            }
    }

    function openPopupItemDetail(details) {

        var popUpCtrl = this;
        var modalInstance = popUpCtrl.$uibModal.open({
            component: 'viewItemDetailModal',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                details: function() {
                    return (details || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                //if (data && data.action == "update");
                if (data && data.action == "update") popUpCtrl.init();

            }),
            function(err) {
                console.log('Error in Item Detail Modal');
                console.log(err);
            }
    }

    function HistoryUserReqDetailsController($state, $uibModal, moment, Lightbox, historyService) {
        var ctrl = this;
        ctrl.$state = $state;
        ctrl.$uibModal = $uibModal;

        ctrl.init = function() {
            ctrl.loader = true;
            ctrl.message = false;
            ctrl.date = moment().format("MM.DD.YYYY");
            ctrl.selectedDate(ctrl.date);
            // inventoryService.getInventory()
            // 		.then(function(response){
            // 			ctrl.loader = false;
            // 			ctrl.Inventory = response.data;
            // 			if(ctrl.Inventory.length == 0){
            // 				ctrl.message = true;
            // 			}
            // 		})
            // 		.catch(function(err){
            // 			console.log('Error getting user-items details:');
            // 			console.log(err);
            // 		});	

        };

        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };
        ctrl.viewUserDetail = function(userDetail){
        	angular.bind(ctrl, openPopupUserDetail, angular.copy(userDetail))();
        }
        ctrl.viewItemDetail = function(itemDetail){
        	angular.bind(ctrl, openPopupItemDetail, itemDetail)();
        }

        ctrl.selectedDate = function(date) {
        	ctrl.loader = true;
            // ctrl.pickupRecords = [{
            //     "date": "02.12.2018",
            //     "items": [{
            //         "brandName": "hjhg",
            //         "condition": "jhgjh",
            //         "eventualDamages": "gjhgjhg",
            //         "imageUrl": ["https://s3.amazonaws.com/bathwaterkids.images.dev/1518514351838.jpg"],
            //         "itemCodes": ["jhgjg"],
            //         "itemName": "jghhjg",
            //         "location": "jhgjh",
            //         "storedItemID": "b6e7f5e3-07b9-4181-9b5a-0622b8ef9f04",
            //         "subItems": []
            //     }],
            //     "status": "completed",
            //     "time": "10am-12pm",
            //     "timestamp": 1518393600000,
            //     "type": "pickup",
            //     "user": {
            //         "address": {
            //             "city": " ",
            //             "streetAddress": "Delhi, India",
            //             "zipCode": "110085"
            //         },
            //         "firstName": "Nitish",
            //         "phoneNumber": "+919999771008",
            //         "userID": "df2b0333-acb7-4fc7-8de6-13ed87fcc212"
            //     },
            //     "userRequestID": "2841a2ce-bea4-41a2-ae1b-93c5a7c7b2ed"
            // }];

            historyService.getUserReqByDate(date)
            		.then(function(response){
            			ctrl.loader = false;
            			ctrl.pickupRecords = response.data;
            			ctrl.message = ctrl.pickupRecords.length == 0;
            		})
            		.catch(function(err){
            			console.log('Error getting userReq by date details:');
            			console.log(err);
            		});	
        };
        ctrl.addUpdateCredit = function(item) {
            angular.bind(ctrl, openPopupCreditUpdate, angular.copy(item))();
        };

        ctrl.init();
    }

    angular.module('historyUserReqDetails')
        .component('historyUserReqDetails', {
            templateUrl: 'history/history-userRequest-details/history-userRequest-details.template.html',
            controller: ['$state', '$uibModal', 'moment', 'Lightbox', 'historyService', HistoryUserReqDetailsController]
        });

})(window.angular);
