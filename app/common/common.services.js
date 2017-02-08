(function (angular) {
function AdminRightsService() {
	var rights = [];

  function addRights(rightsList) {
      rights = angular.copy(rightsList);
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