(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.lunchMenu = "";
	$scope.message = "";

	$scope.checkIfTooMuch = function() {
		if ($scope.lunchMenu == undefined || $scope.lunchMenu.length == 0) {
			$scope.message = "Please enter data first";
			return;
		}
		var quantityOfItems = $scope.lunchMenu.split(",").length
		if (quantityOfItems <= 3) {
			$scope.message = "Enjoy!";
		} else {
			$scope.message = "Too much!";		
		}
	}
}

}) ();