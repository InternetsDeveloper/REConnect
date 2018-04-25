(function() {
	'use strict';

	/**
	 * @class worthClark.customer.CustomerDetailController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {CustomerService} CustomerService - @see CustomerService
	 * @param {CustomerModel} CustomerModel - @see CustomerModel
	 * @param {NoteModel} NoteModel - @see NoteModel
	 * @param {ServiceRequestService} ServiceRequestService - @see ServiceRequestService
	 * @param {IState} $state - @see IState
	 * @param {LoDashStatic} _ - @see _
	 * @param {NoteService} NoteService - @see NoteService
	 * @param {DepartmentService} DepartmentService - @see DepartmentService
	 * @param {AddressService} AddressService - @see AddressService
	 * @param {AddressModel} AddressModel - @see AddressModel
	 * @param {USStatesService} USStatesService - @see USStatesService
	 * @param {Validations} Validations - @see Validations
	 * @param {TechnicianService} TechnicianService - @see TechnicianService
	 * @param {DispatchCodeService} DispatchCodeService - @see DispatchCodeService
	 * @param {DispatchService} DispatchService - @see DispatchService
	 * @param {FormIntegrity} FormIntegrity - @see FormIntegrity
	 */
	angular
		.module('worthClark.customer')
		.controller('CustomerDetailController', ['$mdToast', '$scope', '$stateParams', 'CustomerService', 'CustomerModel',
			'NoteModel', 'ServiceRequestService', '$state', '_', 'NoteService', 'DepartmentService',
			'AddressService', 'AddressModel', 'USStatesService', 'Validations', 'TechnicianService', 'DispatchCodeService', 'DispatchService',
			'FormIntegrity',
			function($mdToast, $scope, $stateParams, CustomerService, CustomerModel, NoteModel, ServiceRequestService, $state, _,
				NoteService, DepartmentService, AddressService, AddressModel, USStatesService, Validations,
				TechnicianService, DispatchCodeService, DispatchService, FormIntegrity) {
				var DELAY = 3000,
					vm = this;

				vm.validation = Validations;
				vm.formIntegrity = FormIntegrity;
				vm.usStates = USStatesService;
				vm.usStates.searchText = '';
				vm.usStates.serviceSearchText = '';
				vm.resetRequest = function() {
					vm.request = {
						notes: null,
						customerId: $stateParams.id || null,
						addressId: null,
						appointment: {
							time: moment().startOf('hour').add(1, 'hour').toDate(),
							type: 'soft'
						},
						technicianId: null,
						sourceId: null,
						typeId: null,
						dispatchCode: null
					};
				};

				vm.resetRequest();
				vm.dispatchCodes = DispatchCodeService;

				/*
				 * Load Existing Product
				 */
				if(vm.request.customerId) {
					CustomerService.fetch(vm.request.customerId).then(function(response) {
						vm.model = CustomerModel(response.data);
						vm.request.customerId = vm.model.id;

						_.forEach(response.data.customer_notes, function(note) {
							vm.notes.push(NoteModel(note));
						});
					});
				}

				/*
				 * Copy service to billing checkbox
				 */
				vm.copyAddress = function() {
					vm.model.billingAddresses = vm.model.serviceAddresses;
				};

				/*
				 * Service Address Edit
				 */
				vm.editServiceAddress = function(address) {
					vm.toggleServiceAddressForm();
					vm.newServiceAddress = address;
				};

				/*
				 * Service Address Select
				 */
				vm.selectServiceAddress = function() {
					vm.request.addressId = null;
					vm.address = null;
					$scope.$broadcast('selectServiceAddress');
				};

				$scope.$watch(function() {
					return vm.address;
				}, function(customer) {
					if(!customer) {
						return;
					}
				});

				/*
				 * New Service Request
				 */
				vm.showServiceRequestBuilder = true;

				vm.startRequest = function() {
					vm.showServiceRequestBuilder = true;
					$scope.$broadcast('selectServiceAddress');
				};

				vm.cancelRequest = function() {
					vm.resetRequest();
					vm.address = null;
					vm.showServiceRequestBuilder = false;
				};

				vm.saveServiceRequest = function(status) {
					vm.request.status = status;

					ServiceRequestService.createServiceRequest(vm.request).then(function(response) {
						vm.model.serviceRequests.push(response.data);

						vm.showServiceRequestBuilder = false;
						vm.address = null;

						vm.resetRequest();

						$mdToast.show(
							$mdToast.simple()
								.textContent('Service request added')
								.position('top right')
								.hideDelay(DELAY)
						);
					});
				};

				/*
				 * Initial Data Fetch
				 */
				ServiceRequestService.getAllLeadSources().then(function(response) {
					vm.sources = response.data.lead_source;
				});

				ServiceRequestService.getAllPaymentTypes().then(function(response) {
					vm.paymentTypes = response.data.paymenttype;
				});

				ServiceRequestService.getAllTypes().then(function(response) {
					vm.types = response.data.servicerequesttype;
				});

				TechnicianService.getAll().then(function(response) {
					vm.technicians = response.data.technician;
				});

				DispatchCodeService.getAll().then(function(response) {
					vm.dispatchCodes = response.data.dispatch_code;
				});

				DispatchService.getLocations().then(function(response) {
					vm.locations = response.data.location;
				});

				CustomerService.getTypes().then(function(response) {
					if(vm.model.companyName) {
						vm.customerTypes = _.first(_.filter(response.data.customertype, {
							id: 2
						}));
					} else {
						vm.customerTypes = _.first(_.filter(response.data.customertype, {
							id: 1
						}));
					}
				});

				/*
				 * Service Address Change
				 */
				vm.showServiceAddressForm = false;
				vm.newServiceAddress = new AddressModel({});

				vm.addNewServiceAddress = function(address) {
					if(address.$invalid) {
						address.submitted = true;

						return;
					}

					if(vm.newServiceAddress.state.abbreviation) {
						vm.newServiceAddress.state = vm.newServiceAddress.state.abbreviation;
					}

					if(vm.newServiceAddress.id) {
						AddressService.update(vm.newServiceAddress).then(function(response) {
							var index = _.indexOf(vm.model.serviceAddresses, _.find(vm.model.serviceAddresses, {
								id: vm.newServiceAddress.id
							}));

							vm.model.serviceAddresses[index] = new AddressModel(response.data);
							vm.newServiceAddress = new AddressModel({});
							vm.usStates.searchServiceText = null;
							vm.showServiceAddressForm = false;
						});
					} else {
						AddressService.create(vm.newServiceAddress).then(function(response) {
							vm.model.serviceAddresses.push(new AddressModel(response.data));

							CustomerService.update(vm.model).then(function(response2) {
								vm.model = CustomerModel(response2.data);
							});

							vm.newServiceAddress = new AddressModel({});
							vm.usStates.searchServiceText = null;
							vm.showServiceAddressForm = false;
						});
					}
				};

				vm.toggleServiceAddressForm = function() {
					vm.newServiceAddress = new AddressModel({});
					vm.showServiceAddressForm = !vm.showServiceAddressForm;
				};

				/*
				 * Customer create & update
				 */
				vm.submit = function() {
					if(vm.request.customerId) {
						if(vm.model.billingAddresses.state.abbreviation) {
							vm.model.billingAddresses.state = vm.model.billingAddresses.state.abbreviation;
						}

						AddressService.update({
							id: vm.model.billingAddresses.id,
							street: vm.model.billingAddresses.street,
							street_two: vm.model.billingAddresses.street_two,
							city: vm.model.billingAddresses.city,
							state: vm.model.billingAddresses.state,
							zip: vm.model.billingAddresses.zip,
							latitude: vm.model.billingAddresses.latitude,
							longitude: vm.model.billingAddresses.longitude,
							location: vm.model.billingAddresses.location
						}).then(function() {
							CustomerService.update(vm.model).then(function(response) {
								vm.model = CustomerModel(response.data);
								vm.formIntegrity.setPristine();
								$mdToast.show(
									$mdToast.simple()
										.textContent('Customer saved successfully')
										.hideDelay(DELAY)
								);
							});
						});
					} else {
						CustomerService.create(vm.model).then(function(response) {
							vm.model = CustomerModel(response.data);
							vm.formIntegrity.setPristine();
							$mdToast.show(
								$mdToast.simple()
									.textContent('Customer created successfully')
									.hideDelay(DELAY)
							);

							$state.go('worthClark.customer.detail', {
								id: response.data.id
							});
						});
					}
				};

				/*
				 * Notes Add
				 */
				vm.notes = [];
				vm.showAddNotes = false;

				vm.addNote = function(note) {
					if(note.$invalid) {
						note.submitted = true;

						return;
					}

					NoteService.save(1, vm.model.id, note.text.$modelValue).then(function(response) {
						vm.notes.push(NoteModel(response.data));
						vm.showAddNotes = false;
					});
				};

				vm.toggleAddNotes = function() {
					vm.showAddNotes = !vm.showAddNotes;
				};

				vm.addressLimit = '';

				vm.changeLimit = function() {
					var DEFAULT_LIMIT = 5;

					vm.addressLimit = vm.addressLimit > DEFAULT_LIMIT ? DEFAULT_LIMIT : vm.model.serviceAddresses.length;
				};
			}]);
})();
