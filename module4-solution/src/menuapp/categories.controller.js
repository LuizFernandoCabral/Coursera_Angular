(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

// Version with resolving to 1 item based on $stateParams in route config
CategoriesController.$inject = ['MenuDataService', 'categories'];
function CategoriesController(MenuDataService, categories) {
	var categoriesCrtl = this;
	categoriesCrtl.categories = categories;
}

})();
