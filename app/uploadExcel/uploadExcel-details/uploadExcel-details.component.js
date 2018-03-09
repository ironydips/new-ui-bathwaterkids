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

    function UploadExcelDetailsController($state,$scope, $uibModal, moment, Lightbox, historyService) {
        var ctrl = this;
        ctrl.$state = $state;
        ctrl.$uibModal = $uibModal;

        ctrl.init = function() {
            ctrl.loader = true;
            ctrl.message = false;
            ctrl.date = moment().format("MM.DD.YYYY");
            ctrl.selectedDate(ctrl.date);
            // inventoryService.getInventory()
            //      .then(function(response){
            //          ctrl.loader = false;
            //          ctrl.Inventory = response.data;
            //          if(ctrl.Inventory.length == 0){
            //              ctrl.message = true;
            //          }
            //      })
            //      .catch(function(err){
            //          console.log('Error getting user-items details:');
            //          console.log(err);
            //      }); 

        };

        ctrl.openLightboxModal = function(images) {
            //LightBox Library used as Image Viewer.
            Lightbox.openModal(images, 0);
        };
        ctrl.selectRow = function(rowIndex) {
            ctrl.selectedRow = rowIndex;
        };
        ctrl.viewUserDetail = function(userDetail) {
            angular.bind(ctrl, openPopupUserDetail, angular.copy(userDetail))();
        }
        ctrl.viewItemDetail = function(itemDetail) {
            angular.bind(ctrl, openPopupItemDetail, itemDetail)();
        };

//         ctrl.ExcelExport= function (event) {
// debugger;

//     var input = event.target;
//     var reader = new FileReader();
//     reader.onload = function(){
//         var fileData = reader.result;
//         var wb = XLSX.read(fileData, {type : 'binary'});

//         wb.SheetNames.forEach(function(sheetName){
//         var rowObj =XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
//         var jsonObj = JSON.stringify(rowObj);
//         console.log(jsonObj)
//         })
//     };
//     debugger;
//     reader.readAsBinaryString(input.files[0]);
//     };
  ctrl.loadWorksheet = function(e) {
    // Read Workbook
    debugger;
    var file = e.target.result;
    var workbook = XLSX.read(file, { type: "binary" });

    // Get the first worksheet as JSON
    var sheetName = workbook.SheetNames[0];
    
    // Update scope and log it
    ctrl.sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);    
    console.log(ctrl.sheet);
    $scope.$apply();
    alert(ctrl.sheet) // Need this to update angular of the changes
  };
$('#files').change(handleFile);
  function handleFile(e) {
     //Get the files from Upload control
        var files = e.target.files;
        var i, f;
                         ctrl.result;

     //Loop through files
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function (e) {
                var data = e.target.result;

                var workbook = XLSX.read(data, { type: 'binary' });
                
                var sheet_name_list = workbook.SheetNames;
                sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    //Convert the cell value to Json
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    if (roa.length > 0) {
                        ctrl.result = roa;
                    }
                });
                debugger;
                console.log(ctrl.result)
               //Get the first column first cell value
                //alert(result[0].Column1);
            };
            reader.readAsArrayBuffer(f);
                debugger;

        }
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
                .then(function(response) {
                    ctrl.loader = false;
                    ctrl.pickupRecords = response.data;
                    ctrl.message = ctrl.pickupRecords.length == 0;
                })
                .catch(function(err) {
                    console.log('Error getting userReq by date details:');
                    console.log(err);
                });
        };
        ctrl.addUpdateCredit = function(item) {
            angular.bind(ctrl, openPopupCreditUpdate, angular.copy(item))();
        };

        ctrl.init();
    }

    angular.module('uploadExcelDetails')
        .component('uploadExcelDetails', {
            templateUrl: 'uploadExcel/uploadExcel-details/uploadExcel-details.template.html',
            controller: ['$state','$scope', '$uibModal', 'moment', 'Lightbox', 'historyService', UploadExcelDetailsController]
        });

})(window.angular);
