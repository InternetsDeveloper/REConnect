(function () {
    'use strict';

    angular.module('reConnect.department')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.department', {
                url: '/department',
                redirectTo: 'reConnect.department.typeAssign'
            });

            $stateProvider.state('reConnect.department.typeAssign', {
                url: '/type-assign',
                title: 'Product/Services Categories & Tag Settings',
                views: {
                    'content@': {
                        controller: 'TagTypeAssignController',
                        controllerAs: 'settings',
                        templateUrl: 'html/tag-type-assign.tpl.html'
                    }
                }
            });
		}]);
})();
