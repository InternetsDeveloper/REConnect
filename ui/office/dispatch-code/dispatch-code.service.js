(function () {
    'use strict';

    /**
     * @function DispatchCodeService
     * @memberOf reConnect.dispatchCode
     * @description This is the service to interact with all address APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.dispatchCode')
        .factory('DispatchCodeService', ['$http', 'Constants', function ($http, Constants) {
            return {
                getAll: getAll,
                create: create,
                update: update
            };

            /**
             * Get a list of all addresses.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'service/dispatch_code');
            }

            /**
             * Create a new address.
             *
             * @param {Object} dispatchCode - The input dispatchCode information address.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function create(dispatchCode) {
                return $http.post(Constants.apiURL + 'service/dispatch_code', dispatchCode);
            }

            /**
             * Update an existing address.
             *
             * @param {Object} dispatchCode - The input dispatchCode information address.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function update(dispatchCode) {
                return $http.put(Constants.apiURL + 'service/dispatch_code/' + dispatchCode.id, dispatchCode);
            }
		}]);
})();