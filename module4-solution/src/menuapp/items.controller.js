(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// Version with resolving to 1 item based on $stateParams in route config
ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
	var itemsCrtl = this;
	itemsCrtl.items = items;
}

})();
