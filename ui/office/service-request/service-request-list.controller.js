(function () {
    'use strict';

    // This is not to be done without explicit reason and a sign-off
    /* eslint "max-lines": "off" */

    angular
        .module('reConnect.serviceRequest')
        .controller('ServiceRequestController', ['$scope', '$state', '$stateParams', 'ServiceRequestService', 'Constants', 'serviceRequestListModel',
			function ($scope, $state, $stateParams, ServiceRequestService, Constants, serviceRequestListModel) {
                var SEVEN_DAY_RANGE = 6,
                    vm = this;

                vm.date = {
                    startDate: moment().subtract(SEVEN_DAY_RANGE, 'days').toDate(),
                    endDate: moment().toDate()
                };

                vm.presetRanges = {
                    1: {
                        label: 'Today',
                        value: 1,
                        rangeLabel: 'for Today'
                    },
                    7: {
                        label: '7 Days',
                        value: 6,
                        rangeLabel: 'for last 7 Days'
                    },
                    30: {
                        label: '30 Days',
                        value: 29,
                        rangeLabel: 'for Past 30 Days'
                    },
                    60: {
                        label: '60 Days',
                        value: 59,
                        rangeLabel: 'for Past 60 Days'
                    },
                    90: {
                        label: '90 Days',
                        value: 89,
                        rangeLabel: 'for Past 90 Days'
                    }
                };

                vm.tableLayout = {
                    promiseTimestamp: {
                        label: 'Date',
                        key: 'promiseTimestamp',
                        show: true,
                        searchText: ''
                    },
                    serviceAddress: {
                        label: 'Service Address',
                        key: 'serviceAddress',
                        show: true,
                        searchText: ''
                    },
                    type: {
                        label: 'Request Type',
                        key: 'type',
                        show: true,
                        searchText: ''
                    },
                    customerName: {
                        label: 'Customer Name',
                        key: 'customerName',
                        show: true,
                        searchText: ''
                    },
                    serviceRequestTechnician: {
                        label: 'Technician',
                        key: 'serviceRequestTechnician',
                        show: true,
                        searchText: ''
                    }
                };

                vm.tableFilter = function () {
                    var filters = {
                        keys: {},
                        isEmpty: true
                    };

                    if (vm.tableLayout.promiseTimestamp.searchText) {
                        filters.keys.promiseTimestamp = vm.tableLayout.promiseTimestamp.searchText;
                    }

                    if (vm.tableLayout.serviceAddress.searchText) {
                        filters.keys.serviceAddress = vm.tableLayout.serviceAddress.searchText;
                    }

                    if (vm.tableLayout.type.searchText) {
                        filters.keys.type = vm.tableLayout.type.searchText;
                    }

                    if (vm.tableLayout.customerName.searchText) {
                        filters.keys.customerName = vm.tableLayout.customerName.searchText;
                    }

                    if (vm.tableLayout.serviceRequestTechnician.searchText) {
                        filters.keys.serviceRequestTechnician = vm.tableLayout.serviceRequestTechnician.searchText;
                    }

                    filters.isEmpty = _.isEmpty(filters.keys);

                    return filters;
                };


                /*
                 * Table Config
                 */

                vm.tableConfig = {
                    order: '',
                    limit: 15,
                    page: $stateParams.pageNum || 1,
                    mdOnPaginate: function (newPageNumber) {
                        $state.go('worthClark.serviceRequest.list', {
                            pageNum: newPageNumber
                        }, {
                            notify: false
                        });
                    },
                    button: {
                        show: true,
                        ctrl: {
                            action: function (customer) {
                                $state.go('worthClark.serviceRequest.detail', {
                                    id: customer.id
                                }, {
                                    notify: true
                                });
                            },
                            ariaLabelFn: function (item) {
                                return ['Open service request detail for ', item.name].join('');
                            }
                        },
                        template: '<md-button \
							aria-label="ariaLabelFn(item)" \
							ng-click="action(item)" \
							class="md-primary">View \
							</md-button>'
                    }
                };

                vm.activeRange = {};

                vm.updateActiveRange = function (range) {
                    var isPreset = angular.isDefined(range.value);

                    if (isPreset) {
                        vm.activeRange.selected = false;
                        vm.activeRange = range;
                        vm.activeRange.selected = true;
                    } else {
                        vm.activeRange.selected = false;
                        vm.activeRange = {
                            rangeLabel: 'for ' + moment(vm.date.startDate).format('M/D') + ' - ' + moment(vm.date.endDate).format('M/D')
                        };
                    }

                    vm.setRange(vm.activeRange);
                };

                vm.setRange = function (range) {
                    if (range.value) {
                        vm.date.startDate = moment().subtract(range.value, 'days').toDate();
                    }

                    vm.initializeData(vm.date.startDate, vm.date.endDate);
                };

                $scope.$on(Constants.DATE_RANGE_CHANGE, vm.updateActiveRange);

                vm.tableData = function () {
                    return vm.filteredServiceRequests;
                };

                vm.sortType = 'estimated_start_date'; // set the default sort type
                vm.sortReverse = false; // set the default sort order
                vm.searchCustomers = ''; // set the default search/filter term

                // initialize filter object
                vm.serviceRequestFilter = '';

                vm.serviceRequestsLoading = true;
                vm.serviceRequests = [];
                vm.selection = [];
                vm.messageResponses = [];

                vm.initializeData = function (startDate, endDate) {
                    var uniqueItems = function (data, key) {
                        var idx,
                            result = [],
                            value;

                        for (idx = 0; idx < data.length; idx++) {
                            value = data[idx][key];

                            if (result.indexOf(value) === -1) {
                                result.push(value);
                            }
                        }

                        return result;
                    };

                    vm.serviceRequestsLoading = true;

                    vm.promise = ServiceRequestService.getServiceRequestsByDateRange(startDate, endDate).then(function (response) {
                        vm.serviceRequests = _.map(response.data.service_request, function (request) { // response.data.service_request;
                            return serviceRequestListModel(request);
                        });
                        vm.serviceRequestsLoading = false;
                    });

                    vm.useStatus = {};
                    vm.useType = {};
                    vm.useTechnician = {};
                    vm.useDepartment = {};
                    vm.searchServiceRequests = '';

                    // Watch the pants that are selected
                    $scope.$watch(function () {
                        return {
                            serviceRequests: vm.serviceRequests,
                            useStatus: vm.useStatus,
                            useType: vm.useType,
                            useTechnician: vm.useTechnician,
                            useDepartment: vm.useDepartment
                        };
                    }, function () {
                        vm.count = function (prop, value) {
                            return function (el) {
                                return el[prop] === value;
                            };
                        };

                        vm.statusGroup = uniqueItems(vm.serviceRequests, 'status');
                        vm.filteredServiceRequests = filterList(vm.serviceRequests, vm.useStatus, 'status');

                        vm.typeGroup = uniqueItems(vm.serviceRequests, 'type');
                        vm.filteredServiceRequests = filterList(vm.filteredServiceRequests, vm.useType, 'type');

                        vm.technicianGroup = uniqueItems(vm.serviceRequests, 'service_request_technician');
                        vm.filteredServiceRequests = filterList(vm.filteredServiceRequests, vm.useTechnician, 'service_request_technician');

                        vm.departmentGroup = uniqueItems(vm.serviceRequests, 'departmentName');
                        vm.filteredServiceRequests = filterList(vm.filteredServiceRequests, vm.useDepartment, 'departmentName');

                        function filterList(previousList, useSet, setKey) {
                            var idx1, pre,
                                result = {
                                    arr: [],
                                    selected: false
                                };

                            for (idx1 in previousList) {
                                if (previousList.hasOwnProperty(idx1)) {
                                    pre = previousList[idx1];

                                    checklistBuild(pre, useSet, setKey, result);
                                }
                            }

                            if (!result.selected) {
                                result.arr = previousList;
                            }

                            return result.arr;
                        }

                        function checklistBuild(pre, useSet, setKey, result) {
                            var idx;

                            for (idx in useSet) {
                                if (useSet.hasOwnProperty(idx) && useSet[idx]) {
                                    result.selected = true;

                                    if (idx === pre[setKey]) {
                                        result.arr.push(pre);
                                        break;
                                    }
                                }
                            }
                        }
                    }, true);
                };

                vm.drpOptions = {
                    eventHandlers: {
                        'apply.daterangepicker': function () {
                            vm.initializeData(vm.date.startDate.format('YYYY-MM-DD'), vm.date.endDate.format('YYYY-MM-DD'));
                        }
                    }
                };


                vm.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: true,
                    decapitate: false,
                    largeEditDialog: false,
                    boundaryLinks: false,
                    limitSelect: true,
                    pageSelect: true
                };

                vm.updateActiveRange(vm.presetRanges[7]);
			}]);
})();
