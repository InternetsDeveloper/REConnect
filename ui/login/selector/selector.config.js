(function () {
    'use strict';

    angular.module('reConnect.selector').config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('reConnect.selector', {
            url: 'selector',
            views: {
                'content@': {
                    templateUrl: 'html/selector.tpl.html'
                }
            }
        });
	}]);
})();