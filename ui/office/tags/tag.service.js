(function() {
	'use strict';

	/**
	 * @function TagService
	 * @memberOf worthClark.tags
	 * @description This is the service to interact with all tag APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.tags')
		.factory('TagService', ['$http', 'Constants', function($http, Constants) {
			return {
				getAllTypes: getAllTypes
			};

			/**
			 * Get a list of all tag types with tags.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllTypes() {
				return $http.get(Constants.apiURL + 'service/tag_type');
			}
		}]);
})();
