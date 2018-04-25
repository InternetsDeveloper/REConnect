(function() {
	'use strict';

	/**
	 * Represents a service request list model.
	 * @constructor
	 *
	 * @property {Number} id
	 * @property {String} status
	 * @property {{ id: Number, name: String }} department
	 * @property {String} productLineId
	 * @property {String} type
	 * @property {String} location
	 * @property {String} promiseTimestamp
	 * @property {Object} serviceInfo
	 * @property {String} serviceInfo.name
	 * @property {String} serviceInfo.address
	 * @property {String} serviceInfo.phone
	 * @property {Object} billingInfo
	 * @property {String} billingInfo.name
	 * @property {String} billingInfo.address
	 * @property {String} billingInfo.phone
	 * @property {String} billingInfo.invoice
	 * @property {Array<{ id: Number, timestamp: String, techName: String, completed: Boolean, dispatch: Boolean }>} appointments
	 * @property {Array<{ id: Number, user: String, created: String, updated: String, description: String }>} history
	 *
	 * @param {{
	 * 		id: Number,
	 * 		service_request_status: String,
	 * 		department: { id: Number, name: String },
	 * 		service_request_type: String,
	 * 		location: String,
	 * 		promised_date: String,
	 * 		promised_time: String,
	 * 		customer: {
	 * 			full_name: String
	 * 		},
	 * 		service_request_service_address: String,
	 * 		technicians: {
	 * 			full_name: String
	 * 		},
	 * 		appointments: Array<{
	 * 			id: Number,
	 * 			scheduled_date: String,
	 * 			scheduled_time: String,
	 * 			dispatch: Boolean,
	 * 			completed: Boolean,
	 * 			technician: {
	 * 				id: Number,
	 * 				full_name: String
	 * 			}
	 * 		}>,
	 * 		notes: Array<{
	 *			id: Number,
	 *			user: String,
	 *			description: String,
	 *			created: String,
	 *			updated: String
	 * 		}>
	 * }} serviceRequest - The service request data object.
	 *
	 * @returns {Object} ServiceRequest
	 */
	var ServiceRequestListModel = function(serviceRequest) {
		this.id = serviceRequest.id;
		this.status = serviceRequest.service_request_status;
		this.department = serviceRequest.department;
		this.departmentName = serviceRequest.department_name;
		this.productLineId = serviceRequest.product_line;
		this.type = serviceRequest.service_request_type;
		this.location = serviceRequest.location;

		this.serviceInfo = {
			name: serviceRequest.customer.full_name,
			address: serviceRequest.service_request_service_address,
			phone: serviceRequest.phone
		};

		this.billingInfo = {
			name: serviceRequest.billing_customer,
			address: serviceRequest.billing_address,
			phone: serviceRequest.billing_phone,
			invoice: serviceRequest.invoice
		};
		this.appointments = serviceRequest.appointments.map(function(appointment) {
			return {
				id: appointment.id,
				techName: appointment.technician.full_name,
				techId: appointment.technician.id,
				dispatch: appointment.dispatch,
				completed: appointment.completed,
				timestamp: moment(appointment.scheduled_date + ' ' + appointment.scheduled_time, 'YYYY-MM-DD HH:mm').format('ddd, MMM D h:mma')
			};
		});

		// properties used by service request list
		this.promiseTimestamp = moment(serviceRequest.promised_date_short + ' ' +
			serviceRequest.promised_time, 'YYYY-MM-DD HH:mm').format('ddd, MMM D h:mma');

		this.serviceRequestTechnician = this.appointments[0] ? this.appointments[0].techName : '';
		this.serviceAddress = this.serviceInfo.address;
		this.customerName = this.serviceInfo.name;

		this.history = serviceRequest.notes;
	};

	/**
	 * @class worthClark.serviceRequest.serviceRequestModel
	 *
	 * @memberOf worthClark.serviceRequest
	 */
	angular
		.module('worthClark.serviceRequest')
		.factory('serviceRequestListModel', [function() {
			/**
			 * Returns an instance of the ServiceRequestListModel class
			 *
			 * @typedef {Object} ServiceRequestListModel
			 *
			 * @param {Object} task - The customer data object.
			 *
			 * @returns {ServiceRequestListModel} ServiceRequestListModel instance - Instantiates the service request object.
			 */
			return function(task) {
				return new ServiceRequestListModel(task);
			};
		}]);
})();
