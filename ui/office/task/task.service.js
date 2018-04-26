(function () {
    'use strict';

    /**
     * @function TaskService
     * @memberOf reConnect.task
     * @description This is the service to interact with all task APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.task')
        .factory('TaskService', ['$http', 'Constants', function ($http, Constants) {
            return {
                create: create,
                fetch: fetch,
                getAll: getAll,
                getTypes: getTypes,
                update: update
            };

            /**
             * Get a single task.
             *
             * @param {Number} id - The task's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'task/task/' + id);
            }

            /**
             * Get the full list of tasks.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'task/task');
            }

            /**
             * Get the full list of task types.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getTypes() {
                return $http.get(Constants.apiURL + 'task/tasktype');
            }

            /**
             * Update an existing task.
             *
             * @see {Task}
             *
             * @param {Task} Task - The task object.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function update(Task) {
                if (angular.isUndefined(Task.companyName)) {
                    Task.companyName = null;
                }

                return $http.put(Constants.apiURL + 'task/task/' + Task.id, {
                    priority: 3,
                    first_name: Task.firstName,
                    last_name: Task.lastName,
                    company_name: Task.companyName,
                    contract_rate: Task.contractRate || false,
                    email: Task.email,
                    alternate_email: Task.alternateEmail,
                    work_phone: Task.workPhone,
                    home_phone: Task.homePhone,
                    mobile_phone: Task.mobilePhone,
                    billing_addresses: [{
                        id: Task.billingAddresses.id
					}],
                    service_addresses: Task.serviceAddresses.map(function (address) {
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
                    able_to_bill: Task.ableToBill || 0,
                    rate_type: Task.type.id
                });
            }

            /**
             * Create a new task.
             *
             * @param {Task} Task - @see {Task}
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function create(Task) {
                if (angular.isUndefined(Task.companyName)) {
                    Task.companyName = null;
                }
                if (Task.billingAddresses.state.abbreviation) {
                    Task.billingAddresses.state = Task.billingAddresses.state.abbreviation;
                }
                if (Task.serviceAddresses.state.abbreviation) {
                    Task.serviceAddresses.state = Task.serviceAddresses.state.abbreviation;
                }

                Task.billingAddresses.street_two = null;
                Task.serviceAddresses.street_two = null;

                return $http.post(Constants.apiURL + 'task/task', {
                    priority: 3,
                    first_name: Task.firstName,
                    last_name: Task.lastName,
                    company_name: Task.companyName,
                    contract_rate: Task.contractRate || false,
                    email: Task.email,
                    alternate_email: Task.alternateEmail,
                    work_phone: Task.workPhone,
                    home_phone: Task.homePhone,
                    mobile_phone: Task.mobilePhone,
                    billing_addresses: Task.billingAddresses,
                    service_addresses: Task.serviceAddresses,
                    able_to_bill: Task.ableToBill || 0
                });
            }
		}]);
})();
