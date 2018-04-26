(function () {
    'use strict';

    angular.module('reConnect.utils.focusauto', []).directive('focusauto', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                var DELAY = 1000;

                $timeout(function () {
                    $element[0].focus();
                }, DELAY);
            }
        };
	}]);
})();
