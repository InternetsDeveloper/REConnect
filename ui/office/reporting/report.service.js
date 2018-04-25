(function() {
	'use strict';

	/**
	 * @function ReportService
	 * @memberOf worthClark.report
	 * @description This is the service to interact with all report APIs.
	 *
	 * @param {IHttpService} $http - Angular $http service.
	 * @param {Constants} Constants - App constants object.
	 *
	 * @returns {Object} - Returns the functions available for this service.
	 */
	angular
		.module('worthClark.report')
		.factory('ReportService', ['$http', 'Constants', function($http, Constants) {
			return {
				create: create,
				fetch: fetch,
				getAll: getAll,
				getTypes: getTypes,
				update: update
			};

			/**
			 * Get a single report.
			 *
			 * @param {Number} id - The report's id to get.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function fetch(id) {
				return $http.get(Constants.apiURL + 'report/report/' + id);
			}

			/**
			 * Get the full list of reporting.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAll() {
				return $http.get(Constants.apiURL + 'report/report');
			}

			/**
			 * Get the full list of report types.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getTypes() {
				return $http.get(Constants.apiURL + 'report/reporttype');
			}

			/**
			 * Update an existing report.
			 *
			 * @see {Report}
			 *
			 * @param {Report} Report - The report object.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function update(Report) {
				if(angular.isUndefined(Report.companyName)) {
					Report.companyName = null;
				}

				return $http.put(Constants.apiURL + 'report/report/' + Report.id, {
					priority: 3,
					first_name: Report.firstName,
					last_name: Report.lastName,
					company_name: Report.companyName,
					contract_rate: Report.contractRate || false,
					email: Report.email,
					alternate_email: Report.alternateEmail,
					work_phone: Report.workPhone,
					home_phone: Report.homePhone,
					mobile_phone: Report.mobilePhone,
					billing_addresses: [{
						id: Report.billingAddresses.id
					}],
					service_addresses: Report.serviceAddresses.map(function(address) {
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
					able_to_bill: Report.ableToBill || 0,
					rate_type: Report.type.id
				});
			}

			/**
			 * Create a new report.
			 *
			 * @param {Report} Report - @see {Report}
			 *
			 * @return {IPromise} - Returns an Angular promise.
			 */
			function create(Report) {
				if(angular.isUndefined(Report.companyName)) {
					Report.companyName = null;
				}
				if(Report.billingAddresses.state.abbreviation) {
					Report.billingAddresses.state = Report.billingAddresses.state.abbreviation;
				}
				if(Report.serviceAddresses.state.abbreviation) {
					Report.serviceAddresses.state = Report.serviceAddresses.state.abbreviation;
				}

				Report.billingAddresses.street_two = null;
				Report.serviceAddresses.street_two = null;

				return $http.post(Constants.apiURL + 'report/report', {
					priority: 3,
					first_name: Report.firstName,
					last_name: Report.lastName,
					company_name: Report.companyName,
					contract_rate: Report.contractRate || false,
					email: Report.email,
					alternate_email: Report.alternateEmail,
					work_phone: Report.workPhone,
					home_phone: Report.homePhone,
					mobile_phone: Report.mobilePhone,
					billing_addresses: Report.billingAddresses,
					service_addresses: Report.serviceAddresses,
					able_to_bill: Report.ableToBill || 0
				});
			}
		}]);
})();
