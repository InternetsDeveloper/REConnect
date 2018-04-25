(function() {
	'use strict';

	/**
	 * @function MarketingService
	 * @memberOf worthClark.marketing
	 * @description This is the service to interact with all marketing APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.marketing')
		.factory('MarketingService', ['$http', 'Constants', function($http, Constants) {
			return {
				create: create,
				fetch: fetch,
				getAll: getAll,
				getTypes: getTypes,
				update: update
			};

			/**
			 * Get a single marketing.
			 *
			 * @param {Number} id - The marketing's id to get.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function fetch(id) {
				return $http.get(Constants.apiURL + 'marketing/marketing/' + id);
			}

			/**
			 * Get the full list of marketings.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAll() {
				return $http.get(Constants.apiURL + 'marketing/marketing');
			}

			/**
			 * Get the full list of marketing types.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getTypes() {
				return $http.get(Constants.apiURL + 'marketing/marketingtype');
			}

			/**
			 * Update an existing marketing.
			 *
			 * @see {Marketing}
			 *
			 * @param {Marketing} Marketing - The marketing object.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function update(Marketing) {
				if(angular.isUndefined(Marketing.companyName)) {
					Marketing.companyName = null;
				}

				return $http.put(Constants.apiURL + 'marketing/marketing/' + Marketing.id, {
					priority: 3,
					first_name: Marketing.firstName,
					last_name: Marketing.lastName,
					company_name: Marketing.companyName,
					contract_rate: Marketing.contractRate || false,
					email: Marketing.email,
					alternate_email: Marketing.alternateEmail,
					work_phone: Marketing.workPhone,
					home_phone: Marketing.homePhone,
					mobile_phone: Marketing.mobilePhone,
					billing_addresses: [{
						id: Marketing.billingAddresses.id
					}],
					service_addresses: Marketing.serviceAddresses.map(function(address) {
						return {
							id: address.id,
							street: address.street,
							street_two: address.street_two,
							city: address.city,
							state: address.state,
							zip: address.zip,
							latitude: address.latitude,
							longitude: address.longitude,
							location: address.location.id
						};
					}),
					able_to_bill: Marketing.ableToBill || 0,
					rate_type: Marketing.type.id
				});
			}

			/**
			 * Create a new marketing.
			 *
			 * @param {Marketing} Marketing - @see {Marketing}
			 *
			 * @return {IPromise} - Returns an Angular promise.
			 */
			function create(Marketing) {
				if(angular.isUndefined(Marketing.companyName)) {
					Marketing.companyName = null;
				}
				if(Marketing.billingAddresses.state.abbreviation) {
					Marketing.billingAddresses.state = Marketing.billingAddresses.state.abbreviation;
				}
				if(Marketing.serviceAddresses.state.abbreviation) {
					Marketing.serviceAddresses.state = Marketing.serviceAddresses.state.abbreviation;
				}

				Marketing.billingAddresses.street_two = null;
				Marketing.serviceAddresses.street_two = null;

				return $http.post(Constants.apiURL + 'marketing/marketing', {
					priority: 3,
					first_name: Marketing.firstName,
					last_name: Marketing.lastName,
					company_name: Marketing.companyName,
					contract_rate: Marketing.contractRate || false,
					email: Marketing.email,
					alternate_email: Marketing.alternateEmail,
					work_phone: Marketing.workPhone,
					home_phone: Marketing.homePhone,
					mobile_phone: Marketing.mobilePhone,
					billing_addresses: Marketing.billingAddresses,
					service_addresses: Marketing.serviceAddresses,
					able_to_bill: Marketing.ableToBill || 0
				});
			}
		}]);
})();
