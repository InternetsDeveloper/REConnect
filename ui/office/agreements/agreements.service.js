(function () {
    'use strict';

    /**
     * @function AgreementService
     * @memberOf reConnect.agreements
     * @description This is the service to interact with all agreement APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.agreements')
        .factory('AgreementService', ['$http', 'Constants', function ($http, Constants) {
            var getReminders = function (agreement) {
                var aMaxLength = 3,
                    list = agreement.reminderDate,
                    reminderNames = ['first', 'second', 'third'],
                    reminderString = ['scheduled', 'reminder', 'date'],
                    value = {};

                angular.forEach(list, function (date, idx) {
                    if (idx < aMaxLength) {
                        var remidnerStringCopy = reminderString.slice();

                        remidnerStringCopy.splice(1, 0, reminderNames[idx]);
                        value[remidnerStringCopy.join('_')] = moment(list[idx]).format('YYYY-MM-DD');
                    }
                });

                return value;
            };

            return {
                create: create,
                fetch: fetch,
                getAll: getAll,
                update: update
            };

            /**
             * Get a single agreement.
             *
             * @param {Number} id - The agreement's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'agreement/agreement/' + id);
            }

            /**
             * Get the full list of agreements.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'agreement/agreement');
            }

            /**
             * Update an existing agreement.
             *
             * @see {Agreement}
             *
             * @param {Agreement} Agreement - @see {Agreement}
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function update(Agreement) {
                return $http.put(Constants.apiURL + 'agreement/agreement/' + Agreement.id, angular.extend({
                    name: Agreement.name,
                    payment_amount: Agreement.amount,
                    payment_frequency: Agreement.paymentFrequency,
                    discount: Agreement.discount,
                    max_discount: Agreement.maxDiscount,
                    expiration_date: Agreement.duration,
                    description: Agreement.notes,
                    schedule_type: Agreement.scheduleStyle,
                    interval: Agreement.interval,
                    number_of_reminders: Agreement.numberOfReminders
                }, getReminders(Agreement)));
            }

            /**
             * Create a new agreement.
             *
             * @param {Agreement} Agreement - @see {Agreement}
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function create(Agreement) {
                return $http.post(Constants.apiURL + 'agreement/agreement', angular.extend({
                    name: Agreement.name,
                    payment_amount: Agreement.amount,
                    payment_frequency: Agreement.paymentFrequency,
                    discount: Agreement.discount,
                    max_discount: Agreement.maxDiscount,
                    expiration_date: Agreement.duration,
                    description: Agreement.notes,
                    schedule_type: Agreement.scheduleStyle,
                    interval: Agreement.interval,
                    number_of_reminders: Agreement.numberOfReminders
                }, getReminders(Agreement)));
            }
		}]);
})();
