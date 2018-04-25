(function() {
	'use strict';

	/**
	 * @function DepartmentService
	 * @memberOf worthClark.department
	 * @description This is the service to interact with all department APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.department')
		.factory('DepartmentService', ['$http', 'Constants', function($http, Constants) {
			return {
				getAll: getAll,
				fetch: fetch,
				update: update,
				updateTagTypes: updateTagTypes
			};

			/**
			 * Get a list of all departments.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAll() {
				return $http.get(Constants.apiURL + 'service/department');
			}

			/**
			 * Get a single department departments.
			 *
			 * @param {Number} id - The department id to load.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function fetch(id) {
				return $http.get(Constants.apiURL + 'service/department/' + id);
			}

			/**
			 * Update a single department departments.
			 *
			 * @param {Number} id - The department id to save to.
			 * @param {Object} data - The department data to save.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function update(id, data) {
				return $http.put(Constants.apiURL + 'service/department/' + id, {
					department: data
				});
			}

			/**
			 * Update a single department's tag types.
			 *
			 * @param {Number} id - The department id to save to.
			 * @param {Array<Number>} data - The array of tag type ids.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function updateTagTypes(id, data) {
				return $http.put(Constants.apiURL + 'service/department/' + id, {
					tag_types: data
				});
			}
		}]);
})();
