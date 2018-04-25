(function() {
	'use strict';

	angular.module('worthClark.customer')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.customer', {
				url: '/customer',
				redirectTo: 'worthClark.customer.list'
			});

			$stateProvider.state('worthClark.customer.create', {
				url: '/create',
				title: 'New Customer',
				views: {
					'content@': {
						controller: 'CustomerDetailController',
						controllerAs: 'customer',
						templateUrl: 'html/customer-detail.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.customer.list', {
				url: '/list/:pageNum',
				params: {
					pageNum: null
				},
				title: 'Search Customers',
				views: {
					'content@': {
						controller: 'CustomerController',
						controllerAs: 'customerList',
						templateUrl: 'html/customer-list.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.customer.detail', {
				url: '/:id',
				title: 'Customer Details',
				views: {
					'content@': {
						controller: 'CustomerDetailController',
						controllerAs: 'customer',
						templateUrl: 'html/customer-detail.tpl.html'
					}
				}
			});
		}]);
})();
