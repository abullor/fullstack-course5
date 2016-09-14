(function() {
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunch = "";
        $scope.message = "";

        $scope.checkLunch = function() {
            var total = countItems($scope.lunch);

            if (total <= 0) {
                $scope.message = "Please enter data first";
            } else if (total <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }     
        };
    }

    function countItems(string) {
        var items = string.split(",");

        var total = 0;

        for (var i = 0; i < items.length; i++) {
            if (items[i].trim() != "") {
                total++;
            }
        }

        return total;
    }
})();