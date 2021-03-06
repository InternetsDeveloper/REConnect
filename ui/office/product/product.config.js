(function () {
    'use strict';

    /**
     * @function Config
     * @memberOf reConnect.product
     * @description Sets the route configuration for product.
     *
     * @param {IStateProvider} $stateProvider - Angular $http service.
     *
     * @returns {void} - Returns nothing.
     */
    angular.module('reConnect.product')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.product', {
                url: '/product',
                redirectTo: 'reConnect.product.search'
            });

            $stateProvider.state('reConnect.product.search', {
                url: '/search',
                title: 'Product Search',
                views: {
                    'content@': {
                        controller: 'ProductSearchController',
                        controllerAs: 'search',
                        templateUrl: 'html/product-search.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.product.create', {
                url: '/create',
                title: 'Create Product',
                views: {
                    'content@': {
                        controller: 'ProductDetailController',
                        controllerAs: 'product',
                        templateUrl: 'html/product-detail.tpl.html'
                    }
                }
            });
            $stateProvider.state('reConnect.product.upload', {
                url: '/upload',
                title: 'Product CSV Upload',
                views: {
                    'content@': {
                        controller: 'ProductUploadController',
                        controllerAs: 'productUpload',
                        templateUrl: 'html/product-upload.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.product.edit', {
                url: '/:id',
                title: 'Edit Product',
                views: {
                    'content@': {
                        controller: 'ProductDetailController',
                        controllerAs: 'product',
                        templateUrl: 'html/product-detail.tpl.html'
                    }
                }
            });
		}]);
})();