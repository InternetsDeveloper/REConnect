(function () {
    'use strict';

    angular.module('reConnect.agreements')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.agreements', {
                url: '/agreements',
                redirectTo: 'reConnect.agreements.list'
            });

            $stateProvider.state('reConnect.agreements.list', {
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
