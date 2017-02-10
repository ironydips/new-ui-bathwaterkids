(function(angular) {
	"use strict";
	angular.module('bathwaterApp.common')
		.filter('findLoginUser', function() {

  return function(listofUsers, user) {

    return listofUsers.filter(function(u) {
      if (user.indexOf(u.username) >= 0) {
        return true;
      }
    });

  };
})
  
})(window.angular)