(function() {
	'use strict';

	angular
		.module('worthClark.address')
		.factory('AddressModel', [addressModel]);

	/**
	 * Represents an address.
	 * @constructor {Object} Address
	 *
	 * @property {Number} id
	 * @property {String} street
	 * @property {String} street_two
	 * @property {String} city
	 * @property {String} state
	 * @property {String} zip
	 * @property {String} latitude
	 * @property {String} longitude
	 * @property {String} location
	 *
	 * @param {Object} address - The address data object.
	 * @param {Number} address.id - The address's identification number.
	 * @param {String} address.street - The address's street line 1.
	 * @param {String} address.street_two - The address's street line 2.
	 * @param {String} address.city - The address's city.
	 * @param {String} address.state - The address's state.
	 * @param {String} address.zip - The address's zip.
	 * @param {String} address.latitude - The address's latitude.
	 * @param {String} address.longitude - The address's longitude.
	 * @param {String} address.location - The address's location.
	 */
	function Address(address) {
		this.id = address.id;
		this.street = address.street;
		this.street_two = address.street_two;
		this.city = address.city;
		this.state = address.state;
		this.zip = address.zip;
		this.latitude = address.latitude;
		this.longitude = address.longitude;
		this.location = address.location;
	}

	/**
	 * @memberOf Address
	 *
	 * @returns {String} - Concatenated first, space, and last name.
	 */
	Address.prototype.display = function() {
		return this.street + ' ' +
			(this.street_two ? this.street_two + ' ' : '') +
			this.city + ', ' +
			this.state + ' ' +
			this.zip;
	};

	/**
	 * @function addressModel
	 *
	 * @return {Function} - Returns a new function to be called to be called to create a new Address object.
	 */
	function addressModel() {
		/**
		 * Returns an instance of the Address class
		 *
		 * @typedef {Object} Address
		 *
		 * @param {Object} address - The address data object.
		 *
		 * @returns {Object} Address instance - Instantiates the address object.
		 */
		return function(address) {
			return new Address(address);
		};
	}
})();
