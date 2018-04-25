(function() {
	'use strict';

	angular.module('worthClark.serviceRequest')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.serviceRequest', {
				url: '/service-request',
				redirectTo: 'worthClark.serviceRequest.list'
			});

			$stateProvider.state('worthClark.serviceRequest.list', {
				url: '/list',
				title: 'Service Requests',
				views: {
					'content@': {
						controller: 'ServiceRequestController',
						controllerAs: 'srCtrl',
						templateUrl: 'html/service-request-list.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.serviceRequest.detail', {
				url: '/:id',
				title: 'Service Request Detail',
				views: {
					'content@': {
						controller: 'ServiceRequestDetailController',
						controllerAs: 'sr',
						templateUrl: 'html/service-request-detail.tpl.html'
					}
				},
				params: {
					appointment: null
				}
			});
		}]);
})();
