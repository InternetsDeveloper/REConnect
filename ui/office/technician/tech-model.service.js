(function () {
    'use strict';

    angular
        .module('reConnect.technician')
        .factory('TechnicianModel', [technicianModel]);

    /**
     * Represents a technician.
     * @constructor {Object} Technician
     *
     * @property {Number} id
     * @property {String} first
     * @property {String} last
     * @property {String} username
     * @property {String} primaryPhone
     * @property {String} email
     * @property {String} biography
     * @property {String} image
     *
     * @param {Object} technician - The technician data object.
     * @param {Number} technician.id - The technician identification number.
     * @param {String} technician.first_name - The technician's first name.
     * @param {String} technician.last_name - The technician's last name.
     * @param {String} technician.user.username - The technician's username.
     * @param {String} technician.phone - The technician's primary phone.
     * @param {String} technician.user.email - The technician's email.
     * @param {String} technician.bio - The technician's biography.
     * @param {String} technician.avatar - The technician's avatar.
     */
    function Technician(technician) {
        this.id = technician.id;
        this.first = technician.first_name;
        this.last = technician.last_name;
        this.username = technician.user.username;
        this.primaryPhone = technician.phone;
        this.email = technician.user.email;
        this.biography = technician.bio;
        this.avatar = technician.avatar;
    }

    /**
     * @function technicianModel
     *
     * @return {Function} - Returns a new function to be called to create a new Technician object.
     */
    function technicianModel() {
        /**
         * Returns an instance of the Technician class
         *
         * @typedef {Object} Technician
         *
         * @param {Object} technician - The technician data object.
         *
         * @returns {Object} Technician instance - Instantiates the technician object
         */
        return function (technician) {
            return new Technician(technician);
        };
    }
})();
