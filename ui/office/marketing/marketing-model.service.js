(function() {
	'use strict';

	angular
		.module('worthClark.marketing')
		.factory('MarketingModel', [marketingModel]);

	const DEFAULT_PRIORITY = 3;

	/**
	 * Represents a marketing.
	 * @constructor {Object} Marketing
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
	 * @param {Object} marketing - The marketing data object.
	 * @param {Number} marketing.id - The marketing identification number.
	 * @param {Number} marketing.priority - The marketing priority rating.
	 * @param {String} marketing.first_name - The marketing's first name.
	 * @param {String} marketing.last_name - The marketing's last name.
	 * @param {String} marketing.company_name - The marketing's company name.
	 * @param {String} marketing.email - The marketing's email address.
	 * @param {String} marketing.alternate_email - The marketing's alternative email address.
	 * @param {String} marketing.work_phone - The marketing's work phone.
	 * @param {String} marketing.home_phone - The marketing's home phone.
	 * @param {String} marketing.mobile_phone - The marketing's mobile phone.
	 * @param {Boolean} marketing.contract_rate - Marketing belong to contract rate?
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} marketing.billing_addresses - The marketing's billing addresses.
	 * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
	 *  service_request_status:String, promised_time:String}>} marketing.service_requests - List of marketing's service requests.
	 * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
	 *  zip:String, latitude:String, longitude:String}>} marketing.service_addresses - The marketing's service addresses.
	 * @param {String} marketing.location - The marketing's location.
	 * @param {Object} marketing.rate_type - The marketing's rate type.
	 * @param {Number} marketing.able_to_bill - The marketing's ability to bill.
	 */
	function Marketing(marketing) {
		this.id = marketing.id;
		this.priority = marketing.priority || DEFAULT_PRIORITY;
		this.firstName = marketing.first_name;
		this.lastName = marketing.last_name;
		this.companyName = marketing.company_name;
		this.email = marketing.email;
		this.alternateEmail = marketing.alternate_email;
		this.workPhone = marketing.work_phone;
		this.homePhone = marketing.home_phone;
		this.mobilePhone = marketing.mobile_phone;
		this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
		this.contractRate = marketing.contract_rate;
		this.billingAddresses = _.first(marketing.billing_addresses);
		this.serviceRequests = marketing.service_requests;
		this.serviceAddresses = marketing.service_addresses;
		this.location = marketing.location;
		this.type = marketing.rate_type;
		this.ableToBill = marketing.able_to_bill;
	}

	/**
	 * @memberOf Marketing
	 *
	 * @returns {String} - Concatenated first, space, and last name.
	 */
	Marketing.prototype.fullName = function() {
		return this.firstName + ' ' + this.lastName;
	};

	/**
	 * @function marketingModel
	 *
	 * @return {Function} - Returns a new function to be called to create a new Marketing object.
	 */
	function marketingModel() {
		/**
		 * Returns an instance of the Marketing class
		 *
		 * @typedef {Object} Marketing
		 *
		 * @param {Object} marketing - The marketing data object.
		 *
		 * @returns {Object} Marketing instance - Instantiates the marketing object
		 */
		return function(marketing) {
			return new Marketing(marketing);
		};
	}
})();
