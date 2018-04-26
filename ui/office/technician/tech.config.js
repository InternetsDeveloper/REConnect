(function () {
    'use strict';

    angular.module('reConnect.technician')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.technician', {
                url: '/technician',
                redirectTo: 'reConnect.technician.list'
            });

            $stateProvider.state('reConnect.technician.list', {
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

            $stateProvider.state('reConnect.technician.create', {
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

            $stateProvider.state('reConnect.technician.edit', {
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