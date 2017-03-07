(function(angular){

'use strict';

function IncomingShowAllModal($state) {
    var ctrl = this;

    ctrl.init = function(){

        
    };

    ctrl.cancelshowall= function(){
		ctrl.modalInstance.close();
    };

    ctrl.init();
}

angular.module('incomingShowAllModal')
    .component('incomingShowAllModal', {
        templateUrl: 'warehouse/incoming/incoming-showAllItems-modal/incoming-showAllItems-modal.template.html',
        controller: ['$state', IncomingShowAllModal],
        bindings: {
            modalInstance: '<'
        }
    });
    
})(window.angular);