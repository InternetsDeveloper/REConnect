(function () {
    'use strict';

    angular
        .module('reConnect.serviceRequest')
        .controller('ServiceRequestDetailController', ['$stateParams', '$state', '$window', 'ServiceRequestService',
				'serviceRequestModel', 'DispatchService', 'FormIntegrity', '$mdDialog', '$mdToast', 'TechnicianService',
				function ($stateParams, $state, $window, ServiceRequestService, serviceRequestModel, DispatchService, FormIntegrity,
                $mdDialog, $mdToast, TechnicianService) {
                var notification = $mdToast.simple().position('top right'),
                    vm = this;

                vm.formIntegrity = FormIntegrity;

                if (angular.isUndefined($stateParams.id)) {
                    $window.history.back();
                }

                /*
                 * activeAppointment is a hidden param that must
                 * be added pragmatically to $stateParams
                 */
                vm.activeAppointment = $stateParams.appointment;

                ServiceRequestService.fetch($stateParams.id).then(function (response) {
                    response.data.id = $stateParams.id;
                    vm.model = serviceRequestModel(response.data);

                    vm.model.status = _.find(vm.statuses, {
                        name: vm.model.status
                    }).id;
                });

                ServiceRequestService.getAllStatuses().then(function (response) {
                    vm.statuses = response.data.servicerequeststatus;
                });

                TechnicianService.getAll().then(function (response) {
                    vm.technicians = response.data.technician;
                });

                /*
                 * Comments functionality
                 */
                vm.comment = '';

                vm.saveComment = function () {
                    ServiceRequestService.saveComment($stateParams.id, vm.comment).then(function (response) {
                        vm.model.history.push(_.last(response.data.notes));
                        vm.comment = '';
                        vm.formIntegrity.setPristine();
                    });
                };

                vm.saveStatus = function () {
                    ServiceRequestService.editServiceRequest(vm.model).then(function (response) {
                        vm.model.status = response.data.service_request_status;

                        vm.model.status = _.find(vm.statuses, {
                            name: vm.model.status
                        }).id;

                        notification.textContent('Status updated.');

                        vm.formIntegrity.setPristine();

                        $mdToast.show(notification);
                    });
                };

                vm.showDispatch = function (appt) {
                    if (vm.activeAppointment === appt.id && !appt.dispatch && appt.status !== 'Cancelled') {
                        return true;
                    }

                    return false;
                };

                /*
                 * Dispatch Appointment
                 */
                vm.dispatch = function (appt) {
                    ServiceRequestService.dispatchAppointment(appt.techId, appt.id).then(function () {
                        vm.formIntegrity.setPristine();
                        $window.history.back();
                    });
                };

                /*
                 * Appointment Update
                 */
                vm.updateAppt = function (appt) {
                    appt.technicianId = appt.techId;
                    DispatchService.updateAppointment(appt).then(function () {
                        notification.textContent('Appointment updated.');

                        $mdToast.show(notification);
                    });
                };

                /*
                 * SR cancel dialog
                 */
                vm.showServiceRequestConfirm = function (ev) {
                    if (vm.model.appointments.length > 1) {
                        var confirm = $mdDialog.confirm()
                            .title('Do you wish to continue?')
                            .textContent('You are about to cancel a service request that has additional appointments scheduled.')
                            .targetEvent(ev)
                            .ok('Yes, continue')
                            .cancel('Cancel');

                        $mdDialog.show(confirm).then(function () {
                            ServiceRequestService.cancelServiceRequest(vm.model.id).then(function () {
                                $window.history.back();
                            });
                        });
                    } else {
                        ServiceRequestService.cancelServiceRequest(vm.model.id).then(function () {
                            $window.history.back();
                        });
                    }
                };

                /*
                 * Appointment cancel dialog
                 */
                vm.showAppointmentConfirm = function (appt, ev) {
                    var confirm = $mdDialog.confirm()
                        .title('Do you wish to continue?')
                        .textContent('You are about to cancel an appointment.')
                        .targetEvent(ev)
                        .ok('Yes, continue')
                        .cancel('Cancel');

                    $mdDialog.show(confirm).then(function () {
                        DispatchService.cancelAppointment(appt.id).then(function () {
                            appt.status = 'Cancelled';
                            vm.formIntegrity.setPristine();
                        });
                    });
                };

                /*
                 * Appointment Time Picker
                 */


                vm.timePickerSettings = {
                    interval: 15
                };

                vm.apptTimeEdit = function (appt) {
                    appt.day = moment(appt.timestamp, 'ddd MMM DD h:mm a').format('M/D/YYYY').toString();
                    appt.hour = moment(appt.timestamp, 'ddd MMM DD h:mm a').format('H:mm A').toString();
                    appt.editing = true;
                };

                vm.cancelApptTimeEdit = function (appt) {
                    appt.day = null;
                    appt.hour = null;
                    appt.editing = false;
                };

                vm.saveApptTimeEdit = function (appt) {
                    var saveAppt = {
                        id: appt.id,
                        completed: appt.completed,
                        start: moment(appt.day + ' ' + appt.hour, 'M/D/YYYY H:mm A'),
                        end: moment(appt.day + ' ' + appt.hour, 'M/D/YYYY H:mm A').add(1, 'hours').toDate(),
                        serviceRequestId: $stateParams.id,
                        technicianId: appt.techId,
                        notifyTech: false,
                        notifyCustomer: false
                    };

                    DispatchService.updateAppointment(saveAppt).then(function () {
                        appt.timestamp = moment(appt.day + ' ' + appt.hour, 'M/D/YYYY H:mm A').format('ddd MMM DD h:mm a');
                        appt.day = null;
                        appt.hour = null;
                        appt.editing = false;

                        notification.textContent('Appointment time updated.');

                        $mdToast.show(notification);
                    });
                };

                vm.showApptTimeEdit = function (appt) {
                    return appt.status === 'Scheduled';
                };

                /* Communication */
                vm.chips = {
                    readOnly: true
                };
				}]);
})();
