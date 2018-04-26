(function () {
    'use strict';

    /**
     * @class reConnect.agreements.AgreementModel
     * @memberOf reConnect.agreements
     */
    angular
        .module('reConnect.agreements')
        .factory('AgreementModel', [agreementModel]);

    var parseReminderDates = function (agreement) {
        var date, idx, len,
            properties = [
				'scheduled_first_reminder_date',
				'scheduled_second_reminder_date',
				'scheduled_third_reminder_date'
			],
            values = [];

        for (idx = 0, len = properties.length; idx < len; idx += 1) {
            date = agreement[properties[idx]];

            if (date) {
                values.push(moment(date).toDate());
            }
        }

        return values;
    };

    /**
     * Represents an agreement.
     * @constructor {Object} Agreement
     *
     * @property {Number} id
     * @property {String} name
     * @property {Number} amount
     * @property {Number} paymentFrequency
     * @property {Number} discount
     * @property {Number} maxDiscount
     * @property {Number} duration
     * @property {String} notes
     * @property {String} scheduleStyle
     * @property {String} interval
     * @property {Number} numberOfReminders
     * @property {String} reminderDate
     * @property {String} reminderLabel
     *
     * @param {Object} agreement - The agreement data object.
     * @param {Number} agreement.id - The agreement identification number.
     * @param {String} agreement.name - The agreement name.
     * @param {Number} agreement.payment_amount - The agreement's payment amount.
     * @param {Number} agreement.payment_frequency - The agreement's payment frequency.
     * @param {Number} agreement.discount - The agreement's discount.
     * @param {Number} agreement.max_discount - The agreement's max discount.
     * @param {Number} agreement.expiration_date - The agreement's duration.
     * @param {String} agreement.description - The agreement's description.
     * @param {String} agreement.schedule_type - The agreement's schedule type.
     * @param {String} agreement.interval - The agreement's interval.
     * @param {Number} agreement.number_of_reminders - The agreement's number of reminders.
     * @param {String} agreement.reminder_date - The agreement's reminder date.
     * @param {String} agreement.reminder_label - The agreement's reminder label.
     */
    function Agreement(agreement) {
        this.id = agreement.id;
        this.name = agreement.name;
        this.amount = parseInt(agreement.payment_amount, 10) || '';
        this.paymentFrequency = parseInt(agreement.payment_frequency, 10) || '';
        this.discount = parseInt(agreement.discount, 10) || '';
        this.maxDiscount = parseInt(agreement.max_discount, 10) || '';
        this.duration = parseInt(agreement.expiration_date, 10) || '';
        this.notes = agreement.description;
        this.scheduleStyle = agreement.schedule_type;
        this.interval = agreement.interval;
        this.numberOfReminders = parseInt(agreement.number_of_reminders, 10) || '';
        this.reminderDate = parseReminderDates(agreement);
    }

    /**
     * @function agreementModel
     *
     * @return {Function} - Returns a new function to be called to create a new Agreement class.
     */
    function agreementModel() {
        /**
         * Returns an instance of the Agreement class
         *
         * @typedef {Object} Agreement
         *
         * @param {Object} agreement - The agreement data object.
         *
         * @returns {Object} Agreement instance - Instantiates the agreement object.
         */
        return function (agreement) {
            return new Agreement(agreement);
        };
    }
})();
