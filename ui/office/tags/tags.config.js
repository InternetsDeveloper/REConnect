(function () {
    'use strict';

    angular.module('reConnect.tags')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.tags', {
                url: '/tags',
                redirectTo: 'reConnect.tags.typeAssign'
            });
		}]);
})();
