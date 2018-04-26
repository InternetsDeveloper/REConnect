(function () {
    'use strict';

    /**
     * @function ContactService
     * @memberOf reConnect.contact
     * @description This is the service to interact with all contact APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     * @param {UploadService} UploadService - @see UploadService
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.contact')
        .factory('ContactService', ['$http', 'Constants', 'UploadService', function ($http, Constants, UploadService) {
            return {
                fetch: fetch,
                getAll: getAll,
                getTypes: getTypes,
                deleteContact: deleteContact,
                importContacts: importContacts,
                uploadFile: uploadFile
            };

            /**
             * Get a single contact.
             *
             * @param {Number} id - The contact's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'users/' + id);
            }

            /**
             * Get the full list of contacts.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             *
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'users');
            }

            /**
             * Get the full list of contact types.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getTypes() {
                return $http.get(Constants.apiURL + 'contact/contacttype');
            }

            /**
             *  Delete a contact by id.
             *
             *  @param {Array} data - The contact's id to delete.
             *
             * @returns {IHttpPromise} - Returns an Angular promise.
             */
            function deleteContact(data) {
                var contactIds = angular.toJson(data);

                return $http.delete(Constants.apiURL + 'users/' + contactIds);
            }

            /**
             *  Import a list of contacts.
             *
             *  @param {string} data - JSON of contact objects
             *
             * @returns {IHttpPromise} - Returns an Angular promise.
             */

            function importContacts(data) {
                var filename = angular.toJson(data);

                return $http.post(Constants.apiURL + 'users', filename);
            }

            /**
             * Upload a file to AWS S3
             *
             * @param {File} file - csv file
             * @param {String} guid - GUID for file upload
             *
             * @return {IHttpPromise} - Returns an Angular http promise.
             */
            function uploadFile(file, guid) {
                return UploadService.uploadCsv(file, guid);
            }
		}]);
})();
