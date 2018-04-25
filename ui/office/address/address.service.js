(function() {
	'use strict';

	/**
	 * @function AddressService
	 * @memberOf worthClark.address
	 * @description This is the service to interact with all address APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.address')
		.factory('AddressService', ['$http', 'Constants', function($http, Constants) {
			return {
				getAll: getAll,
				create: create,
				update: update
			};

			/**
			 * Get a list of all addresses.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAll() {
				return $http.get(Constants.apiURL + 'customer/address');
			}

			/**
			 * Create a new address.
			 *
			 * @param {Object} address - The input address information address.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function create(address) {
				return $http.post(Constants.apiURL + 'customer/address', {
					street: address.street,
					street_two: address.street_two,
					city: address.city,
					state: address.state,
					zip: address.zip,
					latitude: address.latitude,
					longitude: address.longitude,
					location: address.location.id
				});
			}

			/**
			 * Update an existing address.
			 *
			 * @param {Object} address - The input address information address.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function update(address) {
				return $http.put(Constants.apiURL + 'customer/address/' + address.id, {
					street: address.street,
					street_two: address.street_two,
					city: address.city,
					state: address.state,
					zip: address.zip,
					latitude: address.latitude,
					longitude: address.longitude,
					location: address.location.id
				});
			}
		}]);
})();
