(function () {
    'use strict';

    angular
        .module('reConnect.task')
        .factory('TaskModel', [taskModel]);

    const DEFAULT_PRIORITY = 3;

    /**
     * Represents a task.
     * @constructor {Object} Task
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
     * @param {Object} task - The task data object.
     * @param {Number} task.id - The task identification number.
     * @param {Number} task.priority - The task priority rating.
     * @param {String} task.first_name - The task's first name.
     * @param {String} task.last_name - The task's last name.
     * @param {String} task.company_name - The task's company name.
     * @param {String} task.email - The task's email address.
     * @param {String} task.alternate_email - The task's alternative email address.
     * @param {String} task.work_phone - The task's work phone.
     * @param {String} task.home_phone - The task's home phone.
     * @param {String} task.mobile_phone - The task's mobile phone.
     * @param {Boolean} task.contract_rate - Task belong to contract rate?
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} task.billing_addresses - The task's billing addresses.
     * @param {Array<{id:Number, promised_date:String, technicians:Array, service_request_type:String,
     *  service_request_status:String, promised_time:String}>} task.service_requests - List of task's service requests.
     * @param {Array<{id:Number, street:String, street_two:String, city:String, state:String,
     *  zip:String, latitude:String, longitude:String}>} task.service_addresses - The task's service addresses.
     * @param {String} task.location - The task's location.
     * @param {Object} task.rate_type - The task's rate type.
     * @param {Number} task.able_to_bill - The task's ability to bill.
     */
    function Task(task) {
        this.id = task.id;
        this.priority = task.priority || DEFAULT_PRIORITY;
        this.firstName = task.first_name;
        this.lastName = task.last_name;
        this.companyName = task.company_name;
        this.email = task.email;
        this.alternateEmail = task.alternate_email;
        this.workPhone = task.work_phone;
        this.homePhone = task.home_phone;
        this.mobilePhone = task.mobile_phone;
        this.phoneNumber = this.mobilePhone || this.homePhone || this.workPhone;
        this.contractRate = task.contract_rate;
        this.billingAddresses = _.first(task.billing_addresses);
        this.serviceRequests = task.service_requests;
        this.serviceAddresses = task.service_addresses;
        this.location = task.location;
        this.type = task.rate_type;
        this.ableToBill = task.able_to_bill;
    }

    /**
     * @memberOf Task
     *
     * @returns {String} - Concatenated first, space, and last name.
     */
    Task.prototype.fullName = function () {
        return this.firstName + ' ' + this.lastName;
    };

    /**
     * @function taskModel
     *
     * @return {Function} - Returns a new function to be called to create a new Task object.
     */
    function taskModel() {
        /**
         * Returns an instance of the Task class
         *
         * @typedef {Object} Task
         *
         * @param {Object} task - The task data object.
         *
         * @returns {Object} Task instance - Instantiates the task object
         */
        return function (task) {
            return new Task(task);
        };
    }
})();
