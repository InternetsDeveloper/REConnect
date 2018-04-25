(function() {
	'use strict';

	angular
		.module('worthClark.propertymanagement')
		.factory('PropertyManagementModel', [propertymanagementModel]);

	const DEFAULT_PRIORITY = 3;

	/**
	 * Represents a propertymanagement.
	 * @constructor {Object} PropertyManagement
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
	 * @param {Object} propertymanagement - The propertymanagement data object.
	 * @param {Number} propertymanagement.id - The propertymanagement identification number.
	 * @param {Number} propertymanagement.priority - The propertymanagement priority rating.
	 * @param {String} propertymanagement.first_name - The propertymanagement's first name.
	 * @param {String} propertymanagement.last_name - The propertymanagement's last name.
	 * @param {String} propertymanagement.company_name - The propertymanagement's company name.
	 * @param {String} propertymanagement.email - The propertymanagement's email address.
	 * @param {String} propertymanagement.alternate_email - The propertymanagement's alternative email address.
	 * @param {String} propertymanagement.work_phone - The propertymanagement's work phone.
	 * @param {String} propertymanagement.home_phone - The propertymanagement's home phone.
	 * @param {String} propertymanagement.mobile_phone - The propertymanagement's mobile phone.
	 * @param {Boolean} propertymanagement.contract_rate - PropertyManagement belong to contract rate?
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} propertymanagement.billing_addresses - The propertymanagement's billing addresses.
	 * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
	 *  service_request_status:String, promised_time:String}>} propertymanagement.service_requests - List of propertymanagement's service requests.
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} propertymanagement.service_addresses - The propertymanagement's service addresses.
	 * @param {String} propertymanagement.location - The propertymanagement's location.
	 * @param {Object} propertymanagement.rate_type - The propertymanagement's rate type.
	 * @param {Number} propertymanagement.able_to_bill - The propertymanagement's ability to bill.
	 */
	function PropertyManagement(propertymanagement) {
		this.id = propertymanagement.id;
		this.priority = propertymanagement.priority || DEFAULT_PRIORITY;
		this.firstName = propertymanagement.first_name;
		this.lastName = propertymanagement.last_name;
		this.companyName = propertymanagement.company_name;
		this.email = propertymanagement.email;
		this.alternateEmail = propertymanagement.alternate_email;
		this.workPhone = propertymanagement.work_phone;
		this.homePhone = propertymanagement.home_phone;
		this.mobilePhone = propertymanagement.mobile_phone;
		this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
		this.contractRate = propertymanagement.contract_rate;
		this.billingAddresses = _.first(propertymanagement.billing_addresses);
		this.serviceRequests = propertymanagement.service_requests;
		this.serviceAddresses = propertymanagement.service_addresses;
		this.location = propertymanagement.location;
		this.type = propertymanagement.rate_type;
		this.ableToBill = propertymanagement.able_to_bill;
	}

	/**
	 * @memberOf PropertyManagement
	 *
	 * @returns {String} - Concatenated first, space, and last name.
	 */
	PropertyManagement.prototype.fullName = function() {
		return this.firstName + ' ' + this.lastName;
	};

	/**
	 * @function propertymanagementModel
	 *
	 * @return {Function} - Returns a new function to be called to create a new PropertyManagement object.
	 */
	function propertymanagementModel() {
		/**
		 * Returns an instance of the PropertyManagement class
		 *
		 * @typedef {Object} PropertyManagement
		 *
		 * @param {Object} propertymanagement - The propertymanagement data object.
		 *
		 * @returns {Object} PropertyManagement instance - Instantiates the propertymanagement object
		 */
		return function(propertymanagement) {
			return new PropertyManagement(propertymanagement);
		};
	}
})();
