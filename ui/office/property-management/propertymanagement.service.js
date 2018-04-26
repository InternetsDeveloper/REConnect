(function () {
    'use strict';

    /**
     * @function PropertyManagementService
     * @memberOf reConnect.propertymanagement
     * @description This is the service to interact with all propertymanagement APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.propertymanagement')
        .factory('PropertyManagementService', ['$http', 'Constants', function ($http, Constants) {
            return {
                create: create,
                fetch: fetch,
                getAll: getAll,
                getTypes: getTypes,
                update: update
            };

            /**
             * Get a single propertymanagement.
             *
             * @param {Number} id - The propertymanagement's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'propertymanagement/propertymanagement/' + id);
            }

            /**
             * Get the full list of propertymanagementing.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'propertymanagement/propertymanagement');
            }

            /**
             * Get the full list of propertymanagement types.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getTypes() {
                return $http.get(Constants.apiURL + 'propertymanagement/propertymanagementtype');
            }

            /**
             * Update an existing propertymanagement.
             *
             * @see {PropertyManagement}
             *
             * @param {PropertyManagement} PropertyManagement - The propertymanagement object.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function update(PropertyManagement) {
                if (angular.isUndefined(PropertyManagement.companyName)) {
                    PropertyManagement.companyName = null;
                }

                return $http.put(Constants.apiURL + 'propertymanagement/propertymanagement/' + PropertyManagement.id, {
                    priority: 3,
                    first_name: PropertyManagement.firstName,
                    last_name: PropertyManagement.lastName,
                    company_name: PropertyManagement.companyName,
                    contract_rate: PropertyManagement.contractRate || false,
                    email: PropertyManagement.email,
                    alternate_email: PropertyManagement.alternateEmail,
                    work_phone: PropertyManagement.workPhone,
                    home_phone: PropertyManagement.homePhone,
                    mobile_phone: PropertyManagement.mobilePhone,
                    billing_addresses: [{
                        id: PropertyManagement.billingAddresses.id
					}],
                    service_addresses: PropertyManagement.serviceAddresses.map(function (address) {
                        return {
                            id: address.id,
                            street: address.street,
                            street_two: address.street_two,
                            city: address.city,
                            state: address.state,
                            zip: address.zip,
                            latitude: address.latitude,
                            longitude: address.longitude,
                            location: address.location.id
                        };
                    }),
                    able_to_bill: PropertyManagement.ableToBill || 0,
                    rate_type: PropertyManagement.type.id
                });
            }

            /**
             * Create a new propertymanagement.
             *
             * @param {PropertyManagement} PropertyManagement - @see {PropertyManagement}
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function create(PropertyManagement) {
                if (angular.isUndefined(PropertyManagement.companyName)) {
                    PropertyManagement.companyName = null;
                }
                if (PropertyManagement.billingAddresses.state.abbreviation) {
                    PropertyManagement.billingAddresses.state = PropertyManagement.billingAddresses.state.abbreviation;
                }
                if (PropertyManagement.serviceAddresses.state.abbreviation) {
                    PropertyManagement.serviceAddresses.state = PropertyManagement.serviceAddresses.state.abbreviation;
                }

                PropertyManagement.billingAddresses.street_two = null;
                PropertyManagement.serviceAddresses.street_two = null;

                return $http.post(Constants.apiURL + 'propertymanagement/propertymanagement', {
                    priority: 3,
                    first_name: PropertyManagement.firstName,
                    last_name: PropertyManagement.lastName,
                    company_name: PropertyManagement.companyName,
                    contract_rate: PropertyManagement.contractRate || false,
                    email: PropertyManagement.email,
                    alternate_email: PropertyManagement.alternateEmail,
                    work_phone: PropertyManagement.workPhone,
                    home_phone: PropertyManagement.homePhone,
                    mobile_phone: PropertyManagement.mobilePhone,
                    billing_addresses: PropertyManagement.billingAddresses,
                    service_addresses: PropertyManagement.serviceAddresses,
                    able_to_bill: PropertyManagement.ableToBill || 0
                });
            }
		}]);
})();
