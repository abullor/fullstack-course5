(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])

    .controller('ToBuyShoppingController', ToBuyShoppingController)
    
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)

    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function(index) {
            ShoppingListCheckOffService.buy(index);
        };
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var bought = this;

        bought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [{name: "cookies", quantity: 10}, 
            {name: "chips", quantity: 15},
            {name: "candies", quantity: 20},
            {name: "chocolates", quantity: 25},
            {name: "almonds", quantity: 30},
            {name: "peanuts", quantity: 35}];

        var boughtItems = [];

        service.buy = function(index) {
            boughtItems.push(toBuyItems[index]);

            toBuyItems.splice(index, 1);
        };

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };
    }
})();