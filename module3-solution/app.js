(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])

    .controller('NarrowItDownController', NarrowItDownController)

    .service('MenuSearchService', MenuSearchService)
    
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowItDownCtrl = this;

        narrowItDownCtrl.searchTerm = "";
        narrowItDownCtrl.found = [];
        narrowItDownCtrl.message = "";

        narrowItDownCtrl.search = function() {
            narrowItDownCtrl.message = "";

            if (narrowItDownCtrl.searchTerm.trim() === "") {
                narrowItDownCtrl.message = "Nothing found";
                narrowItDownCtrl.found = [];
            } else {
                var promise = MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm);

                promise.then(function (response) {
                    narrowItDownCtrl.found = response;

                    if (narrowItDownCtrl.found.length === 0) {
                        narrowItDownCtrl.message = "Nothing found";
                    }
                });
            }
        }

        narrowItDownCtrl.removeItem = function(index) {
            narrowItDownCtrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundItems = result.data.menu_items;

                for (var i = 0; i < foundItems.length; i++) {
                    if (foundItems[i].description.indexOf(searchTerm) === -1) {
                        foundItems.splice(i, 1);
                        i--;
                    }
                }

                return foundItems;
            });
        };
    }
})();