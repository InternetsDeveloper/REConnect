(function () {
    'use strict';

    angular.module('reConnect.customer')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.customer', {
                url: '/customer',
                redirectTo: 'reConnect.customer.list'
            });

            $stateProvider.state('reConnect.customer.create', {
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

            $stateProvider.state('reConnect.customer.list', {
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

            $stateProvider.state('reConnect.customer.detail', {
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
