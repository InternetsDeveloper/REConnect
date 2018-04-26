(function () {
    'use strict';

    angular.module('reConnect.propertymanagement')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.propertymanagement', {
                url: '/propertymanagement',
                title: 'PropertyManagement',
                views: {
                    'content@': {
                        controller: 'PropertyManagementController',
                        controllerAs: 'propertymanagement',
                        templateUrl: 'html/propertymanagement.tpl.html'
                    }
                }
            });
		}]);
})();
