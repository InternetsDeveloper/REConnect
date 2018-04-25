(function() {
	'use strict';

	angular.module('worthClark.report')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.report', {
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
