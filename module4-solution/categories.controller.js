(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);

CategoryListController.$inject = ['items'];
function CategoryListController(items) {
    var categoriesListCtrl = this;

    categoriesListCtrl.items = items;
}

})();