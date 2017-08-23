(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', '$q', '$timeout']
function MenuDataService($http, $q, $timeout) {
  var service = this;
  var ApiBasePath = "https://davids-restaurant.herokuapp.com";

  service.getAllCategories = function() {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    return response;
  }

  service.getItemsForCategory = function(categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
    });
    return response;
  }
}

})();
