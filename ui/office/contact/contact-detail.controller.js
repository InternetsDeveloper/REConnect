(function() {
	'use strict';

	/**
	 * @class worthClark.contact.ContactDetailController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {ContactService} ContactService - @see ContactService
	 * @param {ContactModel} ContactModel - @see ContactModel
	 * @param {IState} $state - @see IState
	 */
	angular
		.module('worthClark.contact')
		.controller('ContactDetailController', ['$mdToast', '$scope', '$stateParams', 'ContactService', 'ContactModel',
			function($mdToast, $scope, $stateParams, ContactService, ContactModel) {
				const vm = this;

				vm.resetRequest = function() {
					vm.request = {
						contactId: $stateParams.id || null
					};
				};

				vm.resetRequest();

				/*
				 * Load Existing Contact
				 */
				if(vm.request.contactId) {
					ContactService.fetch(vm.request.contactId).then(function(response) {
						vm.model = new ContactModel(response.data.user);
						vm.request.contactId = vm.model.id;
					});
				}


				// $scope.$watch(function () {
				//     return vm.address;
				// }, function (contact) {
				//     if (!contact) {
				//         return;
				//     }
				// });

				/*
				 * New Service Request
				 */
				// vm.showServiceRequestBuilder = true;
				//
				// vm.startRequest = function () {
				//     // vm.showServiceRequestBuilder = true;
				//     // $scope.$broadcast('selectServiceAddress');
				// };
				//
				// vm.cancelRequest = function () {
				//     vm.resetRequest();
				// };

				// /*
				//  * Initial Data Fetch
				//  */
				// ServiceRequestService.getAllLeadSources().then(function (response) {
				//     vm.sources = response.data.lead_source;
				// });
				//
				// ServiceRequestService.getAllPaymentTypes().then(function (response) {
				//     vm.paymentTypes = response.data.paymenttype;
				// });
				//
				// ServiceRequestService.getAllTypes().then(function (response) {
				//     vm.types = response.data.servicerequesttype;
				// });
				//
				// TechnicianService.getAll().then(function (response) {
				//     vm.technicians = response.data.technician;
				// });
				//
				// DispatchCodeService.getAll().then(function (response) {
				//     vm.dispatchCodes = response.data.dispatch_code;
				// });
				//
				// DispatchService.getLocations().then(function (response) {
				//     vm.locations = response.data.location;
				// });
				//
				// ContactService.getTypes().then(function (response) {
				//     if (vm.model.companyName) {
				//         vm.contactTypes = _.first(_.filter(response.data.contacttype, {
				//             id: 2
				//         }));
				//     } else {
				//         vm.contactTypes = _.first(_.filter(response.data.contacttype, {
				//             id: 1
				//         }));
				//     }
				// });

				// /*
				//  * Service Address Change
				//  */
				// vm.showServiceAddressForm = false;
				// vm.newServiceAddress = new AddressModel({});
				//
				// vm.addNewServiceAddress = function (address) {
				//     if (address.$invalid) {
				//         address.submitted = true;
				//
				//         return;
				//     }
				//
				//     if (vm.newServiceAddress.state.abbreviation) {
				//         vm.newServiceAddress.state = vm.newServiceAddress.state.abbreviation;
				//     }
				//
				//     if (vm.newServiceAddress.id) {
				//         AddressService.update(vm.newServiceAddress).then(function (response) {
				//             var index = _.indexOf(vm.model.serviceAddresses, _.find(vm.model.serviceAddresses, {
				//                 id: vm.newServiceAddress.id
				//             }));
				//
				//             vm.model.serviceAddresses[index] = new AddressModel(response.data);
				//             vm.newServiceAddress = new AddressModel({});
				//             vm.usStates.searchServiceText = null;
				//             vm.showServiceAddressForm = false;
				//         });
				//     } else {
				//         AddressService.create(vm.newServiceAddress).then(function (response) {
				//             vm.model.serviceAddresses.push(new AddressModel(response.data));
				//
				//             ContactService.update(vm.model).then(function (response2) {
				//                 vm.model = ContactModel(response2.data);
				//             });
				//
				//             vm.newServiceAddress = new AddressModel({});
				//             vm.usStates.searchServiceText = null;
				//             vm.showServiceAddressForm = false;
				//         });
				//     }
				// };

				// vm.toggleServiceAddressForm = function () {
				// 	vm.newServiceAddress = new AddressModel({});
				// 	vm.showServiceAddressForm = !vm.showServiceAddressForm;
				// };
				//
				// /*
				//  * Contact create & update
				//  */
				// vm.submit = function () {
				// 	if (vm.request.contactId) {
				// 		if (vm.model.billingAddresses.state.abbreviation) {
				// 			vm.model.billingAddresses.state = vm.model.billingAddresses.state.abbreviation;
				// 		}
				//
				// 		AddressService.update({
				// 			id: vm.model.billingAddresses.id,
				// 			street: vm.model.billingAddresses.street,
				// 			street_two: vm.model.billingAddresses.street_two,
				// 			city: vm.model.billingAddresses.city,
				// 			state: vm.model.billingAddresses.state,
				// 			zip: vm.model.billingAddresses.zip,
				// 			latitude: vm.model.billingAddresses.latitude,
				// 			longitude: vm.model.billingAddresses.longitude,
				// 			location: vm.model.billingAddresses.location
				// 		}).then(function () {
				// 			ContactService.update(vm.model).then(function (response) {
				// 				vm.model = ContactModel(response.data);
				// 				vm.formIntegrity.setPristine();
				// 				$mdToast.show(
				// 					$mdToast.simple()
				// 						.textContent('Contact saved successfully')
				// 						.hideDelay(DELAY)
				// 				);
				// 			});
				// 		});
				// 	} else {
				// 		ContactService.create(vm.model).then(function (response) {
				// 			vm.model = ContactModel(response.data);
				// 			vm.formIntegrity.setPristine();
				// 			$mdToast.show(
				// 				$mdToast.simple()
				// 					.textContent('Contact created successfully')
				// 					.hideDelay(DELAY)
				// 			);
				//
				// 			$state.go('worthClark.contact.detail', {
				// 				id: response.data.id
				// 			});
				// 		});
				// 	}
				// };

				// vm.changeLimit = function () {
				//     var DEFAULT_LIMIT = 5;
				//
				//     vm.addressLimit = vm.addressLimit > DEFAULT_LIMIT ? DEFAULT_LIMIT : vm.model.serviceAddresses.length;
				// };
			}]);
})();
