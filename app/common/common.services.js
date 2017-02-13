(function (angular) {
function AdminRightsService() {
	var rights = [];
  var copyrights = {};

  var profile = {};

  function addRights(rightsList) {
      copyrights = angular.copy(rightsList);
      rights.push(copyrights);
   };

  function getRights(){
  	return rights;
  };

  function saveProfile(profileInfo){
    profile = angular.copy(profileInfo);
  }

  function getProfile(){
    return profile;
  }

  return {
  	addRights: addRights,
  	getRights: getRights,
    saveProfile: saveProfile,
    getProfile: getProfile
  }
}

angular.module('bathwaterApp.common').factory('AdminRightsService', [AdminRightsService]);
})(window.angular);