(function() {
	'use strict';

	/**
	 * @function CustomerService
	 * @memberOf worthClark.customer
	 * @description This is the service to interact with all customer APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.customer')
		.factory('CustomerService', ['$http', 'Constants', function($http, Constants) {
			return {
				create: create,
				fetch: fetch,
				getAll: getAll,
				getTypes: getTypes,
				update: update
			};

			/**
			 * Get a single customer.
			 *
			 * @param {Number} id - The customer's id to get.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function fetch(id) {
				return $http.get(Constants.apiURL + 'customer/customer/' + id);
			}

			/**
			 * Get the full list of customers.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAll() {
				return $http.get(Constants.apiURL + 'customer/customer');
			}

			/**
			 * Get the full list of customer types.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getTypes() {
				return $http.get(Constants.apiURL + 'customer/customertype');
			}

			/**
			 * Update an existing customer.
			 *
			 * @see {Customer}
			 *
			 * @param {Customer} Customer - The customer object.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function update(Customer) {
				if(angular.isUndefined(Customer.companyName)) {
					Customer.companyName = null;
				}

				return $http.put(Constants.apiURL + 'customer/customer/' + Customer.id, {
					priority: 3,
					first_name: Customer.firstName,
					last_name: Customer.lastName,
					company_name: Customer.companyName,
					contract_rate: Customer.contractRate || false,
					email: Customer.email,
					alternate_email: Customer.alternateEmail,
					work_phone: Customer.workPhone,
					home_phone: Customer.homePhone,
					mobile_phone: Customer.mobilePhone,
					billing_addresses: [{
						id: Customer.billingAddresses.id
					}],
					service_addresses: Customer.serviceAddresses.map(function(address) {
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
					able_to_bill: Customer.ableToBill || 0,
					rate_type: Customer.type.id
				});
			}

			/**
			 * Create a new customer.
			 *
			 * @param {Customer} Customer - @see {Customer}
			 *
			 * @return {IPromise} - Returns an Angular promise.
			 */
			function create(Customer) {
				if(angular.isUndefined(Customer.companyName)) {
					Customer.companyName = null;
				}
				if(Customer.billingAddresses.state.abbreviation) {
					Customer.billingAddresses.state = Customer.billingAddresses.state.abbreviation;
				}
				if(Customer.serviceAddresses.state.abbreviation) {
					Customer.serviceAddresses.state = Customer.serviceAddresses.state.abbreviation;
				}

				Customer.billingAddresses.street_two = null;
				Customer.serviceAddresses.street_two = null;

				return $http.post(Constants.apiURL + 'customer/customer', {
					priority: 3,
					first_name: Customer.firstName,
					last_name: Customer.lastName,
					company_name: Customer.companyName,
					contract_rate: Customer.contractRate || false,
					email: Customer.email,
					alternate_email: Customer.alternateEmail,
					work_phone: Customer.workPhone,
					home_phone: Customer.homePhone,
					mobile_phone: Customer.mobilePhone,
					billing_addresses: Customer.billingAddresses,
					service_addresses: Customer.serviceAddresses,
					able_to_bill: Customer.ableToBill || 0
				});
			}
		}]);
})();
