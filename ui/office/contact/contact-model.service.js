(function () {
    'use strict';

    angular
        .module('reConnect.contact')
        .factory('ContactModel', [contactModel]);

    /**
     * Represents a contact.
     * @constructor {Object} Contact
     *
     * @property {Number} id
     * @property {String} name
     * @property {String} photo_url
     * @property {String} email
     * @property {String} insurance_expiration
     * @property {String} license_expiration
     * @property {Array}  markets
     * @property {String} roles
     * @property {String} lead
     *
     * @param {Object} user - The contact data object.
     * @param {Number} user.id - The contact identification number.
     * @param {String} user.name - The contact's name.
     * @param {String} user.photo_url - The contact's photo url.
     * @param {String} user.email - The contact's email address.
     * @param {String} user.insurance_expiration - The contact's insurance expiration.
     * @param {String} user.license_expiration - The contact's license expiration.
     * @param {Array}  user.markets - The contact's markets

     * @param {String} user.roles - The contact's role groups

     * @param {String} user.lead - The contact's lead that is asssigned to them
     */
    function Contact(user) {
        this.id = user.id;
        this.name = user.name;
        this.photo_url = user.photo_url;
        this.email = user.email;
        this.insurance_expiration = user.insurance_expiration;
        this.license_expiration = user.license_expiration;
        this.markets = user.markets;

        this.roles = user.roles;

        this.lead = user.lead;
    }

    // /**
    //  * @memberOf Contact
    //  *
    //  * @returns {String} - Concatenated first, space, and last name.
    //  */
    // Contact.prototype.fullName = function() {
    // 	return this.firstName + ' ' + this.lastName;
    // };

    /**
     * @function contactModel
     *
     * @return {Function} - Returns a new function to be called to create a new Contact object.
     */
    function contactModel() {
        /**
         * Returns an instance of the Contact class
         *
         * @typedef {Object} Contact
         *
         * @param {Object} user - The contact data object.
         *
         * @returns {Object} Contact instance - Instantiates the contact object
         */
        return function (user) {
            return new Contact(user);
        };
    }
})();
