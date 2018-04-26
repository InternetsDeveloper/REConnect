(function () {
    'use strict';

    angular.module('reConnect.report')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.report', {
                url: '/report',
                title: 'Report',
                views: {
                    'content@': {
                        controller: 'ReportController',
                        controllerAs: 'report',
                        templateUrl: 'html/report.tpl.html'
                    }
                }
            });
		}]);
})();
