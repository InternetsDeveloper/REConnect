(function () {
    'use strict';

    angular.module('reConnect.serviceRequest')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.serviceRequest', {
                url: '/service-request',
                redirectTo: 'reConnect.serviceRequest.list'
            });

            $stateProvider.state('reConnect.serviceRequest.list', {
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

            $stateProvider.state('reConnect.serviceRequest.detail', {
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
