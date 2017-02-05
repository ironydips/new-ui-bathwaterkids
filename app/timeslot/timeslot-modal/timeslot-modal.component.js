
(function(){
'use strict';

function TimeslotModalController($rootScope,$state,$http) {
	var ctrl = this;
	ctrl.timeslot = {days:{}, timeslots:{}, availables:{}};

	ctrl.save = function(){

	$http({
			url: '/rest/createTimeSlotsRange',
            method: "POST",
            data: ctrl.timeslot,
            transformRequest: function(obj) {
		        var str = [];

		        //EXTRA CODE TO MANAGE EXISTING APIS WORK
		        //Add days
		        for(var day in obj.days){
		        	obj.days[day] ? str.push(encodeURIComponent("days") + "=" + encodeURIComponent(day)) : null;
		        }
		        delete obj.days;

		        //Add timeslots
		        for(var timeslot in obj.timeslots){
		        	obj.timeslots[timeslot] ? str.push(encodeURIComponent("timeslots") + "=" + encodeURIComponent(timeslot[timeslot.length - 1])) : null;
		        }
		        delete obj.timeslots;

		        //Add availables
		        for(var index =1; index <=6; index++){
		        	if(obj.availables["s"+index]){
		        		str.push(encodeURIComponent("available") + "=" + encodeURIComponent(obj.availables["s"+index]));
			        }
			        else{
			        	str.push(encodeURIComponent("available") + "=");
			        }
		        }
		        delete obj.availables;

		        for(var p in obj){
		        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		        }
		        return str.join("&");
		    },
            headers: {
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Content-Type": "application/x-www-form-urlencoded"
            }
		})
		.then(function(result){
			debugger;
			ctrl.modalInstance.close('update');
		})
		.catch(function(err){
			console.log('Error Adding Driver');
			console.log(err);
		});
		
	}

	ctrl.cancel = function(){
		ctrl.modalInstance.close();
	}
}

angular.module('timeslotModal')
	.component('timeslotModal',{
		templateUrl: 'timeslot/timeslot-modal/timeslot-modal.template.html',
		controller:['$rootScope','$state','$http', TimeslotModalController],
		bindings:{
			modalInstance: '<'
		}
	});

})(window.angular)