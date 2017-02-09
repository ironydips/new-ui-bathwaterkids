(function (angular) {
function AdminRightsService() {
	var rights = [];
  var addadmin;

  function addRights(rightsList) {
      rights.push(rightsList);
      //console.log(rights);

  };

  function setAdmin(value){
     addadmin = value;
  };
  function editRights(value){
      console.log(value);
  }

  function getAdmin(){
     return addadmin;
  };

  function getRights(){
  	return rights;
  };

  return {
  	addRights: addRights,
  	getRights: getRights,
    setAdmin: setAdmin,
    getAdmin: getAdmin,
    editRights: editRights
  }
}

angular.module('bathwaterApp.common').factory('AdminRightsService', [AdminRightsService]);
})(window.angular);