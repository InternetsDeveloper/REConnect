(function () {
    'use strict';

    angular
        .module('reConnect.login')
        .factory('loginService', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
            function checkSession() {
                return $window.sessionStorage.getItem('authenticated') === 'true';
            }

            function createSession() {
                $window.sessionStorage.setItem('authentication-event-date', new Date());
                $window.sessionStorage.setItem('authenticated', 'true');
                $rootScope.$broadcast('sessionChange');
            }

            function destroySession() {
                $window.sessionStorage.setItem('authentication-event-date', new Date());
                $window.sessionStorage.setItem('authenticated', 'true');
                $rootScope.$broadcast('sessionChange');
            }

            function authentication(username, password) {
                return $http.post('/authentication', {
                    username: username,
                    password: password
                });
            }

            return {
                checkSession: checkSession,
                createSession: createSession,
                destroySession: destroySession,
                authentication: authentication
            };
		}]);
})();