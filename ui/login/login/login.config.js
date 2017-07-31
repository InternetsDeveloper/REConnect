(function () {
    'use strict';

    angular.module('reConnect.login').config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect', {
                url: '/',
                views: {
                    content: {
                        controller: 'LoginController',
                        controllerAs: 'login',
                        templateUrl: 'html/login.tpl.html'
                    }
                }
            });
	}])
        .run(['$state', '$location', 'loginService',
			function ($state, $location, loginService) {
                if (loginService.checkSession() && $location.url() === '/') {
                    $location.url('/selector');
                }
			}]);
})();