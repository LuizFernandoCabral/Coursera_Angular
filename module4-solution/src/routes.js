(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/views/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/views/categories.template.html',
    controller: 'CategoriesController as categoriesCrtl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: 'items/{shortName}',
    templateUrl: 'src/menuapp/templates/views/items.template.html',
    controller: 'ItemsController as itemsCrtl',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  })

}

})();
