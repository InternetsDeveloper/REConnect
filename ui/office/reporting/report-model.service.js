(function () {
    'use strict';

    angular
        .module('reConnect.report')
        .factory('ReportModel', [reportModel]);

    const DEFAULT_PRIORITY = 3;

    /**
     * Represents a report.
     * @constructor {Object} Report
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
     * @param {Object} report - The report data object.
     * @param {Number} report.id - The report identification number.
     * @param {Number} report.priority - The report priority rating.
     * @param {String} report.first_name - The report's first name.
     * @param {String} report.last_name - The report's last name.
     * @param {String} report.company_name - The report's company name.
     * @param {String} report.email - The report's email address.
     * @param {String} report.alternate_email - The report's alternative email address.
     * @param {String} report.work_phone - The report's work phone.
     * @param {String} report.home_phone - The report's home phone.
     * @param {String} report.mobile_phone - The report's mobile phone.
     * @param {Boolean} report.contract_rate - Report belong to contract rate?
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} report.billing_addresses - The report's billing addresses.
     * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
     *  service_request_status:String, promised_time:String}>} report.service_requests - List of report's service requests.
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} report.service_addresses - The report's service addresses.
     * @param {String} report.location - The report's location.
     * @param {Object} report.rate_type - The report's rate type.
     * @param {Number} report.able_to_bill - The report's ability to bill.
     */
    function Report(report) {
        this.id = report.id;
        this.priority = report.priority || DEFAULT_PRIORITY;
        this.firstName = report.first_name;
        this.lastName = report.last_name;
        this.companyName = report.company_name;
        this.email = report.email;
        this.alternateEmail = report.alternate_email;
        this.workPhone = report.work_phone;
        this.homePhone = report.home_phone;
        this.mobilePhone = report.mobile_phone;
        this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
        this.contractRate = report.contract_rate;
        this.billingAddresses = _.first(report.billing_addresses);
        this.serviceRequests = report.service_requests;
        this.serviceAddresses = report.service_addresses;
        this.location = report.location;
        this.type = report.rate_type;
        this.ableToBill = report.able_to_bill;
    }

    /**
     * @memberOf Report
     *
     * @returns {String} - Concatenated first, space, and last name.
     */
    Report.prototype.fullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    /**
     * @function reportModel
     *
     * @return {Function} - Returns a new function to be called to create a new Report object.
     */
    function reportModel() {
        /**
         * Returns an instance of the Report class
         *
         * @typedef {Object} Report
         *
         * @param {Object} report - The report data object.
         *
         * @returns {Object} Report instance - Instantiates the report object
         */
        return function (report) {
            return new Report(report);
        };
    }
})();
