(function() {
	'use strict';

	angular.module('worthClark.agreements')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.agreements', {
				url: '/agreements',
				redirectTo: 'worthClark.agreements.list'
			});

			$stateProvider.state('worthClark.agreements.list', {
				url: '/list/:pageNum',
				params: {
					pageNum: null
				},
				title: 'Service Agreements',
				views: {
					'content@': {
						controller: 'AgreementsController',
						controllerAs: 'agreements',
						templateUrl: 'html/agreements-list.tpl.html'
					}
				}
			});
		}]);
})();
