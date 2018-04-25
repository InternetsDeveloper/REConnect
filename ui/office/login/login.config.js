(function() {
	'use strict';

	angular
		.module('worthClark.login')
		.run(['$state', '$location', 'loginService',
			function($state, $location, loginService) {
				function checkSession() {
					if(loginService.checkSession() && $location.url() === '/') {
						$location.url('/dashboard');
					}
				}

				checkSession();
			}]);
})();
