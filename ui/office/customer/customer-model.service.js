(function() {
	'use strict';

	angular
		.module('worthClark.customer')
		.factory('CustomerModel', [customerModel]);

	const DEFAULT_PRIORITY = 3;

	/**
	 * Represents a customer.
	 * @constructor {Object} Customer
	 *
	 * @property {Number} id
	 * @property {String} firstName
	 * @property {String} lastName
	 * @property {String} companyName
	 * @property {String} email
	 * @property {String} alternateEmail
	 * @property {String} workPhone
	 * @property {String} homePhone
	 * @property {String} mobilePhone
	 * @property {Boolean} contractRate
	 * @property {Array} billingAddresses
	 * @property {Array} serviceRequests
	 * @property {Array} serviceAddresses
	 * @property {String} location
	 * @property {Object} type
	 * @property {Number} ableToBill
	 *
	 * @param {Object} customer - The customer data object.
	 * @param {Number} customer.id - The customer identification number.
	 * @param {Number} customer.priority - The customer priority rating.
	 * @param {String} customer.first_name - The customer's first name.
	 * @param {String} customer.last_name - The customer's last name.
	 * @param {String} customer.company_name - The customer's company name.
	 * @param {String} customer.email - The customer's email address.
	 * @param {String} customer.alternate_email - The customer's alternative email address.
	 * @param {String} customer.work_phone - The customer's work phone.
	 * @param {String} customer.home_phone - The customer's home phone.
	 * @param {String} customer.mobile_phone - The customer's mobile phone.
	 * @param {Boolean} customer.contract_rate - Customer belong to contract rate?
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} customer.billing_addresses - The customer's billing addresses.
	 * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
	 *  service_request_status:String, promised_time:String}>} customer.service_requests - List of customer's service requests.
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} customer.service_addresses - The customer's service addresses.
	 * @param {String} customer.location - The customer's location.
	 * @param {Object} customer.rate_type - The customer's rate type.
	 * @param {Number} customer.able_to_bill - The customer's ability to bill.
	 */
	function Customer(customer) {
		this.id = customer.id;
		this.priority = customer.priority || DEFAULT_PRIORITY;
		this.firstName = customer.first_name;
		this.lastName = customer.last_name;
		this.companyName = customer.company_name;
		this.email = customer.email;
		this.alternateEmail = customer.alternate_email;
		this.workPhone = customer.work_phone;
		this.homePhone = customer.home_phone;
		this.mobilePhone = customer.mobile_phone;
		this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
		this.contractRate = customer.contract_rate;
		this.billingAddresses = _.first(customer.billing_addresses);
		this.serviceRequests = customer.service_requests;
		this.serviceAddresses = customer.service_addresses;
		this.location = customer.location;
		this.type = customer.rate_type;
		this.ableToBill = customer.able_to_bill;
	}

	/**
	 * @memberOf Customer
	 *
	 * @returns {String} - Concatenated first, space, and last name.
	 */
	Customer.prototype.fullName = function() {
		return this.firstName + ' ' + this.lastName;
	};

	/**
	 * @function customerModel
	 *
	 * @return {Function} - Returns a new function to be called to create a new Customer object.
	 */
	function customerModel() {
		/**
		 * Returns an instance of the Customer class
		 *
		 * @typedef {Object} Customer
		 *
		 * @param {Object} customer - The customer data object.
		 *
		 * @returns {Object} Customer instance - Instantiates the customer object
		 */
		return function(customer) {
			return new Customer(customer);
		};
	}
})();
