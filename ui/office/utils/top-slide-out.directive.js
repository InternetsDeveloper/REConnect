(function () {
    'use strict';

    angular
        .module('reConnect.utils.topSlideOut', [
			'ngAnimate',
			'vAccordion'
		])
        .directive('topSlideOut', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'html/top-slide-out.tpl.html',
                scope: {
                    expanded: '='
                },
                controller: ['$scope', function ($scope) {
                    var vm = this;

                    $scope.$watch('expanded', takeAction);

                    function takeAction(value) {
                        if (value) {
                            vm.open();
                        } else {
                            vm.close();
                        }
                    }

                    vm.isOpen = function () {
                        return $scope.expanded === true;
                    };
                    vm.open = function () {
                        return;
                    };
                    vm.close = function () {
                        return;
                    };
                    vm.toggle = function () {
                        return;
                    };
				}]
            };
        });
})();
