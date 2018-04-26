(function () {
    'use strict';

    angular
        .module('reConnect.dispatch')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.dispatch', {
                url: '/dispatch?dispatchDate&view&workHours&department&location',
                title: 'Dispatch Board',
                params: {
                    dispatchDate: {
                        dynamic: true,
                        type: 'string',
                        value: moment().format('YYYY-MM-DD'),
                        squash: true
                    },
                    view: {
                        dynamic: true,
                        type: 'string',
                        value: 'timeline',
                        squash: true
                    },
                    workHours: {
                        dynamic: true,
                        type: 'string',
                        value: 'false',
                        squash: true
                    },
                    department: {
                        dynamic: true,
                        type: 'string',
                        value: 'false',
                        squash: true
                    },
                    location: {
                        dynamic: true,
                        type: 'string',
                        value: 'false',
                        squash: true
                    }
                },
                views: {
                    'content@': {
                        controller: 'DispatchController',
                        controllerAs: 'dispatch',
                        templateUrl: 'html/dispatch.tpl.html'
                    }
                }
            });
		}]);
})();
