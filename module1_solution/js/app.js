(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = '';
        $scope.lunchFeedback = '';

        $scope.evalLunch = function () {
            var items = $scope.lunchMenu;

            if (items.length < 1) {
                $scope.lunchFeedback = 'Please enter data first';
            } else {
                var numOfItems = items.split(',').length;

                if (numOfItems <= 3) {
                    $scope.lunchFeedback = 'Enjoy!';
                } else {
                    $scope.lunchFeedback = 'Too much!';
                }
            }
        };
    }

})();
