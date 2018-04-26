(function () {
    'use strict';

    angular
        .module('reConnect.login')
        .factory('loginService', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
            function checkSession() {
                return $window.sessionStorage.getItem('authenticated') === 'true';
            }

            function destroySession() {
                $window.sessionStorage.setItem('authentication-event-date', new Date());
                $window.sessionStorage.setItem('authenticated', 'true');
                $rootScope.$broadcast('sessionChange');
            }

            return {
                checkSession: checkSession,
                destroySession: destroySession
            };
		}]);
})();
