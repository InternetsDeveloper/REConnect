(function() {
	'use strict';

	angular
		.module('worthClark.serviceRequest')
		.factory('ServiceRequestService', ['$http', 'Constants', function($http, Constants) {
			return {
				fetch: fetch,
				createServiceRequest: createServiceRequest,
				dispatchAppointment: dispatchAppointment,
				editServiceRequest: editServiceRequest,
				getServiceRequestsByDateRange: getServiceRequestsByDateRange,
				getAllTypes: getAllTypes,
				getAllStatuses: getAllStatuses,
				getAllPaymentTypes: getAllPaymentTypes,
				getAllLeadSources: getAllLeadSources,
				saveComment: saveComment,
				cancelServiceRequest: cancelServiceRequest
			};

			/**
			 * Get a single service request.
			 *
			 * @param {Number} id - The service requests's id to get.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function fetch(id) {
				return $http.get(Constants.apiURL + 'service_request_detail/service_request/' + id);
			}

			/**
			 * Save a new service request note.
			 *
			 * @param {Number} id - The service requests's id to update.
			 * @param {String} note - The new service requests note.
			 *
			 * @return {IHttpPromise} - @see IHttpPromise
			 */
			function saveComment(id, note) {
				return $http.put(Constants.apiURL + 'service_request_detail/service_request/' + id, {
					notes: {
						description: note
					}
				});
			}

			/**
			 * Save a new service request note.
			 *
			 * @param {Number} techId - The technician's id assigned to the appointment.
			 * @param {Number} apptId - The appointment id.
			 *
			 * @return {IHttpPromise} - @see IHttpPromise
			 */
			function dispatchAppointment(techId, apptId) {
				return $http.post(Constants.apiURL + 'service_request_detail/dispatch', {
					technician: techId,
					appointment: apptId,
					scheduled_time: moment().format('HH:mm'),
					scheduled_date: moment().format('YYYY-MM-DD')
				});
			}

			/**
			 * Get a list of all service requests by a start and end date.
			 *
			 * @param {String} startDate - The page number.
			 * @param {String} endDate - The number of items per page.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getServiceRequestsByDateRange(startDate, endDate) {
				return $http.get(Constants.apiURL + 'service/service_request', {
					params: {
						start: startDate ? startDate : moment().subtract(1, 'days').format('YYYY-MM-DD'),
						end: endDate ? endDate : moment().format('YYYY-MM-DD')
					}
				});
			}

			/**
			 * Create a new service request.
			 *
			 * @see ServiceRequest
			 * @param {Object} serviceRequest - The new service request data.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function createServiceRequest(serviceRequest) {
				var data = {
						service_address: serviceRequest.addressId,
						customer: serviceRequest.customerId,
						service_request_type: serviceRequest.typeId,
						lead_source: serviceRequest.sourceId,
						department: serviceRequest.departmentId,
						service_request_status: serviceRequest.status || 1,
						technician: serviceRequest.technicianId,
						payment_type: serviceRequest.paymentType,
						sales_person: serviceRequest.salesman,
						dispatch_code: serviceRequest.dispatchCode,
						notes: {
							description: serviceRequest.notes
						}
					},
					promiseTime = serviceRequest.appointment.time ? moment(serviceRequest.appointment.time) : null;

				if(promiseTime) {
					data.promised_date = promiseTime.format('YYYY-MM-DD');
					data.promised_time = promiseTime.format('HH:mm');
				}

				return $http.post(Constants.apiURL + 'service/service_request', data);
			}

			/**
			 * Cancel a service request
			 *
			 * @param {Number} id - The service requests's id to cancel.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function cancelServiceRequest(id) {
				return $http.put(Constants.apiURL + 'service/service_request/' + id, {
					service_request_status: 6
				});
			}

			/**
			 * Edit a service request.
			 *
			 * @see ServiceRequest
			 * @param {Object} serviceRequest - The service request data.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function editServiceRequest(serviceRequest) {
				return $http.put(Constants.apiURL + 'service/service_request/' + serviceRequest.id, {
					service_request_status: serviceRequest.status
				});
			}

			/**
			 * Get a list of all the types of a service request.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllTypes() {
				return $http.get(Constants.apiURL + 'customer_detail/servicerequesttype');
			}

			/**
			 * Get a list of all the statuses of a service request.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllStatuses() {
				return $http.get(Constants.apiURL + 'service/servicerequeststatus');
			}

			/**
			 * Get a list of all the types of a service request.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllPaymentTypes() {
				return $http.get(Constants.apiURL + 'customer_detail/paymenttype');
			}


			/**
			 * Get a list of all possible lead sources of a service request.
			 *
			 * @return {IHttpPromise} - Returns an Angular promise.
			 */
			function getAllLeadSources() {
				return $http.get(Constants.apiURL + 'service/lead_source');
			}
		}]);
})();
