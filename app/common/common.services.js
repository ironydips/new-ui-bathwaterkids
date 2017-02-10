(function (angular) {
function AdminRightsService() {
	var rights = [];
  var copyrights = {};

  function addRights(rightsList) {
      copyrights = angular.copy(rightsList);
      rights.push(copyrights);
      
   };


  function getRights(){
  	return rights;
  };

  return {
  	addRights: addRights,
  	getRights: getRights
  }
}

angular.module('bathwaterApp.common').factory('AdminRightsService', [AdminRightsService]);
})(window.angular);