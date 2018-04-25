(function() {
	'use strict';

	/**
	 * Represents a service request.
	 * @constructor
	 *
	 * @property {Number} id
	 * @property {String} status
	 * @property {{ id: Number, name: String }} department
	 * @property {String} productLineId
	 * @property {String} type
	 * @property {Object} location
	 * @property {String} promiseTimestamp
	 * @property {Number} customerId
	 * @property {String} dispatchCode
	 * @property {String} paymentType
	 * @property {Object} serviceInfo
	 * @property {String} serviceInfo.name
	 * @property {String} serviceInfo.address
	 * @property {String} serviceInfo.homePhone
	 * @property {String} serviceInfo.workPhone
	 * @property {String} serviceInfo.mobilePhone
	 * @property {String} serviceInfo.location
	 * @property {String} serviceInfo.email
	 * @property {String} serviceInfo.addressId
	 * @property {Object} billingInfo
	 * @property {String} billingInfo.name
	 * @property {String} billingInfo.address
	 * @property {String} billingInfo.phone
	 * @property {String} billingInfo.invoice
	 * @property {Array<{ id: Number, timestamp: String, techName: String, completed: Boolean, dispatch: Boolean,
	 * 				notifyTech: Boolean, notifyCustomer: Boolean, status: String }>} appointments
	 * @property {Array<{ id: Number, user: String, created: String, updated: String, description: String }>} history
	 *
	 * @param {{
	 * 		id: Number,
	 * 		service_request_status: String,
	 * 		department: { id: Number, name: String },
	 * 		service_request_type: String,
	 * 		location: Object,
	 * 		promised_date: String,
	 * 		promised_time: String,
	 * 		dispatch_code: String,
	 * 		customer: {
	 * 			full_name: String,
	 * 			company_name: String,
	 * 			id: Number,
	 * 			email: String,
	 * 			mobile_phone: String,
	 * 			home_phone: String,
	 * 			work_phone: String
	 * 		},
	 * 		service_request_service_address: String,
	 * 		service_address: {
	 * 			id: Number
	 *		},
	 * 		technicians: {
	 * 			full_name: String
	 * 		},
	 * 		appointments: Array<{
	 * 			id: Number,
	 * 			scheduled_date: String,
	 * 			scheduled_time: String,
	 * 			dispatch: Boolean,
	 * 			completed: Boolean,
	 * 			notify_tech: Boolean,
	 * 			notify_customer: Boolean,
	 * 			appointment_status: String,
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
	var ServiceRequest = function(serviceRequest) {
		this.id = serviceRequest.id;
		this.status = serviceRequest.service_request_status;
		this.department = serviceRequest.department;
		this.departmentName = serviceRequest.department_name;
		this.productLineId = serviceRequest.product_line;
		this.type = serviceRequest.service_request_type;
		this.location = serviceRequest.location;
		this.paymentType = serviceRequest.payment_type;
		this.promiseTimestamp = serviceRequest.promised_date + ' ' + serviceRequest.promised_time;
		this.customerId = serviceRequest.customer.id;
		this.dispatchCode = serviceRequest.dispatch_code;
		this.serviceInfo = {
			name: serviceRequest.customer.full_name,
			company: serviceRequest.customer.company_name,
			email: serviceRequest.customer.email,
			location: serviceRequest.service_address.location,
			address: serviceRequest.service_request_service_address,
			addressId: serviceRequest.service_address.id,
			mobilePhone: serviceRequest.customer.mobile_phone,
			workPhone: serviceRequest.customer.work_phone,
			homePhone: serviceRequest.customer.home_phone
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
				notifyTech: appointment.notify_tech,
				notifyCustomer: appointment.notify_customer,
				status: appointment.appointment_status,
				timestamp: moment(appointment.scheduled_date + ' ' + appointment.scheduled_time, 'YYYY-MM-DD HH:mm').format('ddd, MMM D h:mma')
			};
		});

		this.history = serviceRequest.notes;
	};

	/**
	 * @class worthClark.serviceRequest.serviceRequestModel
	 *
	 * @memberOf worthClark.serviceRequest
	 */
	angular
		.module('worthClark.serviceRequest')
		.factory('serviceRequestModel', [function() {
			/**
			 * Returns an instance of the ServiceRequest class
			 *
			 * @typedef {Object} ServiceRequest
			 *
			 * @param {Object} task - The customer data object.
			 *
			 * @returns {ServiceRequest} ServiceRequest instance - Instantiates the service request object.
			 */
			return function(task) {
				return new ServiceRequest(task);
			};
		}]);
})();
