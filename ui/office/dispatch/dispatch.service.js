(function () {
    'use strict';

    angular
        .module('reConnect.dispatch')
        .factory('DispatchService', ['$http', 'Constants', function ($http, Constants) {
            return {
                cancelAppointment: cancelAppointment,
                getServiceRequests: getServiceRequests,
                getSchedule: getSchedule,
                getDepartment: getDepartment,
                getLocations: getLocations,
                getTechnicians: getTechnicians,
                getAppointments: getAppointments,
                updateAppointment: updateAppointment,
                createAppointment: createAppointment
            };

            /**
             *
             * @param {String} startDate - Fetch SRs starting with this date.
             * @param {String} endDate - Fetch SRs starting with this date.
             * @param {Boolean} url - Fetch SRs that are not closed.
             *
             * @returns {HttpPromise} - Angular promise.
             */
            function getServiceRequests(startDate, endDate, url) {
                var end, start;

                if (!url || url.indexOf('queue') > -1) {
                    start = startDate ? moment(startDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                    end = endDate ? moment(endDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                }

                return $http.get(Constants.apiURL + (url || 'queue/servicerequest'), {
                    params: {
                        start: start,
                        end: end
                    }
                });
            }

            function getAppointments(startDate, endDate) {
                return $http.get(Constants.apiURL + 'appointment/appointment', {
                    params: {
                        start: startDate ? startDate : moment().format('YYYY-MM-DD'),
                        end: endDate ? endDate : moment().format('YYYY-MM-DD'),
                        scheduled: true
                    }
                });
            }

            /**
             * Cancel an appointment
             *
             * @param {Number} id - The appointment's id to cancel.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function cancelAppointment(id) {
                return $http.put(Constants.apiURL + 'appointment/appointment/' + id, {
                    appointment_status: 'cancelled'
                });
            }

            function updateAppointment(data) {
                var info = data.info;

                return $http.put(Constants.apiURL + 'appointment/appointment/' + data.id, {
                    completed: info.completed,
                    scheduled_date: moment(info.start).format('YYYY-MM-DD HH:mm'),
                    scheduled_duration: moment.duration(moment(info.end).diff(info.start)).asMinutes(),
                    scheduled_time: moment(info.start).format('YYYY-MM-DD HH:mm'),
                    service_request: info.serviceRequestId,
                    technician: info.technicianId,
                    notify_tech: info.notifyTech,
                    notify_customer: info.notifyCustomer
                });
            }

            function createAppointment(data) {
                var info = data.info;

                return $http.post(Constants.apiURL + 'appointment/appointment', {
                    completed: info.completed,
                    scheduled_date: moment(info.start).format('YYYY-MM-DD HH:mm'),
                    scheduled_duration: moment.duration(moment(info.end).diff(info.start)).asMinutes(),
                    scheduled_time: moment(info.start).format('YYYY-MM-DD HH:mm'),
                    service_request: info.serviceRequestId,
                    technician: info.technicianId
                });
            }

            function getSchedule() {
                return $http.get(Constants.apiURL + 'schedule/technician');
            }

            function getDepartment() {
                return $http.get(Constants.apiURL + 'dispatch/department');
            }

            function getLocations() {
                return $http.get(Constants.apiURL + 'location/location');
            }

            function getTechnicians() {
                return $http.get(Constants.apiURL + 'dispatch/technician');
            }
		}]);
})();
