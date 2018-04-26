(function () {
    'use strict';

    angular
        .module('reConnect.home')
        .factory('HomeModel', [homeModel]);

    const DEFAULT_PRIORITY = 3;

    /**
     * Represents a home.
     * @constructor {Object} Home
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
     * @param {Object} home - The home data object.
     * @param {Number} home.id - The home identification number.
     * @param {Number} home.priority - The home priority rating.
     * @param {String} home.first_name - The home's first name.
     * @param {String} home.last_name - The home's last name.
     * @param {String} home.company_name - The home's company name.
     * @param {String} home.email - The home's email address.
     * @param {String} home.alternate_email - The home's alternative email address.
     * @param {String} home.work_phone - The home's work phone.
     * @param {String} home.home_phone - The home's home phone.
     * @param {String} home.mobile_phone - The home's mobile phone.
     * @param {Boolean} home.contract_rate - Home belong to contract rate?
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} home.billing_addresses - The home's billing addresses.
     * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
     *  service_request_status:String, promised_time:String}>} home.service_requests - List of home's service requests.
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} home.service_addresses - The home's service addresses.
     * @param {String} home.location - The home's location.
     * @param {Object} home.rate_type - The home's rate type.
     * @param {Number} home.able_to_bill - The home's ability to bill.
     */
    function Home(home) {
        this.id = home.id;
        this.priority = home.priority || DEFAULT_PRIORITY;
        this.firstName = home.first_name;
        this.lastName = home.last_name;
        this.companyName = home.company_name;
        this.email = home.email;
        this.alternateEmail = home.alternate_email;
        this.workPhone = home.work_phone;
        this.homePhone = home.home_phone;
        this.mobilePhone = home.mobile_phone;
        this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
        this.contractRate = home.contract_rate;
        this.billingAddresses = _.first(home.billing_addresses);
        this.serviceRequests = home.service_requests;
        this.serviceAddresses = home.service_addresses;
        this.location = home.location;
        this.type = home.rate_type;
        this.ableToBill = home.able_to_bill;
    }

    /**
     * @memberOf Home
     *
     * @returns {String} - Concatenated first, space, and last name.
     */
    Home.prototype.fullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    /**
     * @function homeModel
     *
     * @return {Function} - Returns a new function to be called to create a new Home object.
     */
    function homeModel() {
        /**
         * Returns an instance of the Home class
         *
         * @typedef {Object} Home
         *
         * @param {Object} home - The home data object.
         *
         * @returns {Object} Home instance - Instantiates the home object
         */
        return function (home) {
            return new Home(home);
        };
    }
})();
