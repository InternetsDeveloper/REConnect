(function () {
    'use strict';

    /**
     * @function HomeService
     * @memberOf reConnect.home
     * @description This is the service to interact with all home APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.home')
        .factory('HomeService', ['$http', 'Constants', function ($http, Constants) {
            return {
                create: create,
                fetch: fetch,
                getAll: getAll,
                getTypes: getTypes,
                update: update
            };

            /**
             * Get a single home.
             *
             * @param {Number} id - The home's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'home/home/' + id);
            }

            /**
             * Get the full list of homes.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'home/home');
            }

            /**
             * Get the full list of home types.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getTypes() {
                return $http.get(Constants.apiURL + 'home/hometype');
            }

            /**
             * Update an existing home.
             *
             * @see {Home}
             *
             * @param {Home} Home - The home object.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function update(Home) {
                if (angular.isUndefined(Home.companyName)) {
                    Home.companyName = null;
                }

                return $http.put(Constants.apiURL + 'home/home/' + Home.id, {
                    priority: 3,
                    first_name: Home.firstName,
                    last_name: Home.lastName,
                    company_name: Home.companyName,
                    contract_rate: Home.contractRate || false,
                    email: Home.email,
                    alternate_email: Home.alternateEmail,
                    work_phone: Home.workPhone,
                    home_phone: Home.homePhone,
                    mobile_phone: Home.mobilePhone,
                    billing_addresses: [{
                        id: Home.billingAddresses.id
					}],
                    service_addresses: Home.serviceAddresses.map(function (address) {
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
                    able_to_bill: Home.ableToBill || 0,
                    rate_type: Home.type.id
                });
            }

            /**
             * Create a new home.
             *
             * @param {Home} Home - @see {Home}
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function create(Home) {
                if (angular.isUndefined(Home.companyName)) {
                    Home.companyName = null;
                }
                if (Home.billingAddresses.state.abbreviation) {
                    Home.billingAddresses.state = Home.billingAddresses.state.abbreviation;
                }
                if (Home.serviceAddresses.state.abbreviation) {
                    Home.serviceAddresses.state = Home.serviceAddresses.state.abbreviation;
                }

                Home.billingAddresses.street_two = null;
                Home.serviceAddresses.street_two = null;

                return $http.post(Constants.apiURL + 'home/home', {
                    priority: 3,
                    first_name: Home.firstName,
                    last_name: Home.lastName,
                    company_name: Home.companyName,
                    contract_rate: Home.contractRate || false,
                    email: Home.email,
                    alternate_email: Home.alternateEmail,
                    work_phone: Home.workPhone,
                    home_phone: Home.homePhone,
                    mobile_phone: Home.mobilePhone,
                    billing_addresses: Home.billingAddresses,
                    service_addresses: Home.serviceAddresses,
                    able_to_bill: Home.ableToBill || 0
                });
            }
		}]);
})();
