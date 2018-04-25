(function() {
	'use strict';

	/**
	 * @class CallScriptsService
	 *
	 * @memberOf worthClark.callScripts
	 * @description This is the service to interact with all call scripts APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.callScripts')
		.factory('CallScriptsService', ['$http', 'Constants', function($http, Constants) {
			return {
				getAllScripts: getAllScripts
			};

			/**
			 * Get all call scripts.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllScripts() {
				return $http.get(Constants.apiURL + 'call/script');
			}
		}]);
})();

