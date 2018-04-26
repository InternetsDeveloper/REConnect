(function () {
    'use strict';

    angular.module('reConnect.marketing')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.marketing', {
                url: '/marketing',
                title: 'Marketing',
                views: {
                    'content@': {
                        controller: 'MarketingController',
                        controllerAs: 'marketing',
                        templateUrl: 'html/marketing.tpl.html'
                    }
                }
            });
		}]);
})();
