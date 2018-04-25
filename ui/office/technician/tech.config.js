(function() {
	'use strict';

	angular.module('worthClark.technician')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.technician', {
				url: '/technician',
				redirectTo: 'worthClark.technician.list'
			});

			$stateProvider.state('worthClark.technician.list', {
				url: '/list',
				title: 'Search Technicians',
				views: {
					'content@': {
						controller: 'TechController',
						controllerAs: 'tCtrl',
						templateUrl: 'html/tech-list.tpl.html'
					}
				},
				params: {
					message: null
				}
			});

			$stateProvider.state('worthClark.technician.create', {
				url: '/create',
				title: 'Create Technician',
				views: {
					'content@': {
						controller: 'TechDetailController',
						controllerAs: 'technician',
						templateUrl: 'html/tech-detail.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.technician.edit', {
				url: '/:id',
				title: 'Edit Technician',
				views: {
					'content@': {
						controller: 'TechDetailController',
						controllerAs: 'technician',
						templateUrl: 'html/tech-detail.tpl.html'
					}
				}
			});
		}]);
})();
