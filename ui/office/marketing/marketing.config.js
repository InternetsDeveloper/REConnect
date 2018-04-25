(function() {
	'use strict';

	angular.module('worthClark.marketing')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.marketing', {
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
