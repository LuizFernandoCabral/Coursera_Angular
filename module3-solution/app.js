(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundMenuItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.searchTerm = "";

  narrow.narrowIt = function () {
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
    promise.then(function (response) {
      console.log(response);
      narrow.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  narrow.removeItemFromFound = function (itemIndex) {
    narrow.lastRemoved = "Last item removed was " + narrow.found[itemIndex].name;
    narrow.found.splice(itemIndex,1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then (function (result) {
      let returnList = [];
      result.data.menu_items.forEach(function (menuItem, index){
        if (menuItem.description.includes(searchTerm)) {
          returnList.push(menuItem);
        }
      });
      return returnList;
    });

    return response;
  }

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
