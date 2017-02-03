function IndexController($state) {
	this.open = function(name){
		switch(name){
			case 'admin': $state.go('adminPanel'); break;
			case 'junit': break;
			case 'pick': break;
			case 'consumer': break;
		}
	}
}

angular.module('index')
.component('index',{
	templateUrl: 'index/index.template.html',
	controller: ['$state', IndexController]
});