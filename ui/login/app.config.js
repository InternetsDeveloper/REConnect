(function () {
    'use strict';

    angular.module('reConnect').config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('blue-grey');
	}])
        .config(['$locationProvider', '$urlRouterProvider',
			function ($locationProvider, $urlRouterProvider) {
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false,
                    rewriteLinks: false
                });

                $urlRouterProvider.otherwise('/');
			}]);

    angular.bootstrap(document, ['reConnect'], {
        strictDi: true
    });
})();