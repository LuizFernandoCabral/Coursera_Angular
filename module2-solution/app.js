(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;

    toBuy.message = "Everything is bought!";

	toBuy.items = ShoppingListCheckOffService.getBuyList();

	toBuy.itemName = "";
  	toBuy.itemQuantity = "";

  	toBuy.addItem = function () {
    	ShoppingListCheckOffService.addItem(toBuy.itemName, toBuy.itemQuantity);
  	}

  	toBuy.bought = function(itemIndex) {
		ShoppingListCheckOffService.boughtItem(itemIndex);
  	}

  	toBuy.error = function() {
		return toBuy.items === undefined || toBuy.items.length <= 0;
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;

	// try {
		bought.items = ShoppingListCheckOffService.getBoughtList();
	// } catch(error){
	// 	bought.message =  "Nothing bought yet."
	// }
	bought.message = "Nothing bought yet.";

	bought.error = function() {
		return bought.items === undefined || bought.items.length <= 0;
	}
}

function ShoppingListCheckOffService() {
	var service = this;

	var toBuyList = [
	{
		name: 'cookies',
		quantity: 10
	}, 
	{
		name: 'bag of chip',
		quantity: 20
	},
	{
		name: 'soda',
		quantity: 1
	},
	{
		name: 'beer',
		quantity: 6
	},
	{
		name: 'bag of peanuts',
		quantity: 1
	}

	];
	var boughtList = [];

	service.addItem = function (itemName, quantity) {
	    var item = {
	      name: itemName,
	      quantity: quantity
	    };
	    toBuyList.push(item);
	};

  	service.boughtItem = function (itemIdex) {
    	var item = toBuyList.splice(itemIdex, 1)[0];
    	boughtList.push(item);
  	};

  	service.getBuyList = function () {
    	return toBuyList;
  	};

  	service.getBoughtList = function () {
    	return boughtList;
  	};
}
}) ();