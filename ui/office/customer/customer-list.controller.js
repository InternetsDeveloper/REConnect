(function () {
    'use strict';

    angular
        .module('reConnect.customer')
        .controller('CustomerController', ['$state', '$stateParams', 'CustomerService', 'CustomerModel',
			function ($state, $stateParams, CustomerService, CustomerModel) {
                var vm = this;

                vm.customers = [];
                vm.promise = null;

                if ($stateParams.pageNum === '') {
                    $state.go('reConnect.customer.list', {
                        pageNum: 1
                    }, {
                        notify: false
                    });
                }

                vm.promise = CustomerService.getAll().then(function (result) {
                    for (var idx = 0; idx < result.data.customer.length; idx++) {
                        vm.customers.push(new CustomerModel(result.data.customer[idx]));
                    }

                    angular.element('#customer-search').focus();
                });

                vm.tableData = function () {
                    return vm.customers;
                };

                /*
                 * Table Config
                 */
                vm.tableConfig = {
                    order: '',
                    limit: 15,
                    page: $stateParams.pageNum || 1,
                    mdOnPaginate: function (newPageNumber) {
                        $state.go('reConnect.customer.list', {
                            pageNum: newPageNumber
                        }, {
                            notify: false
                        });
                    },
                    button: {
                        show: true,
                        ctrl: {
                            action: function (customer) {
                                $state.go('reConnect.customer.detail', {
                                    id: customer.id
                                }, {
                                    notify: true
                                });
                            },
                            ariaLabelFn: function (customer) {
                                return ['Open customer detail for ', customer.firstName, ' ', customer.lastName].join('');
                            }
                        },
                        template: '<md-button \
							aria-label="ariaLabelFn(item)" \
							ng-click="action(item)" \
							class="md-primary">View \
							</md-button>'
                    },
                    createCustomer: function () {
                        $state.go('reConnect.customer.create', {}, {
                            notify: true
                        });
                    }

                };

                vm.tableLayout = {
                    firstName: {
                        label: 'First Name',
                        key: 'firstName',
                        show: true,
                        searchText: ''
                    },
                    lastName: {
                        label: 'Last Name',
                        key: 'lastName',
                        show: true,
                        searchText: ''
                    },
                    phoneNumber: {
                        label: 'Phone Number',
                        key: 'phoneNumber',
                        show: true,
                        searchText: ''
                    },
                    companyName: {
                        label: 'Company Name',
                        key: 'companyName',
                        show: true,
                        searchText: ''
                    },
                    email: {
                        label: 'Email',
                        key: 'email',
                        show: true,
                        searchText: ''
                    }
                };

                vm.tableFilter = function () {
                    var filters = {
                        keys: {},
                        isEmpty: true
                    };

                    if (vm.tableLayout.firstName.searchText) {
                        filters.keys.firstName = vm.tableLayout.firstName.searchText;
                    }

                    if (vm.tableLayout.lastName.searchText) {
                        filters.keys.lastName = vm.tableLayout.lastName.searchText;
                    }

                    if (vm.tableLayout.companyName.searchText) {
                        filters.keys.companyName = vm.tableLayout.companyName.searchText;
                    }

                    if (vm.tableLayout.phoneNumber.searchText) {
                        filters.keys.phoneNumber = vm.tableLayout.phoneNumber.searchText;
                    }

                    if (vm.tableLayout.email.searchText) {
                        filters.keys.email = vm.tableLayout.email.searchText;
                    }

                    filters.isEmpty = _.isEmpty(filters.keys);

                    return filters;
                };
			}]);
})();
