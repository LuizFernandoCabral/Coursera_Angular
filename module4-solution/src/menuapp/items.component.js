(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/components/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
