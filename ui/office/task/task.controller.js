(function () {
    'use strict';

    angular
        .module('reConnect.task')
        .controller('TaskController', ['$state', '$stateParams', 'TaskService', 'TaskModel',
			function ($state, $stateParams, TaskService, TaskModel) {
                var vm = this;

                vm.tasks = [];
                vm.promise = null;

                if ($stateParams.pageNum === '') {
                    $state.go('reConnect.task.list', {
                        pageNum: 1
                    }, {
                        notify: false
                    });
                }

                vm.promise = TaskService.getAll().then(function (result) {
                    for (var idx = 0; idx < result.data.task.length; idx++) {
                        vm.tasks.push(new TaskModel(result.data.task[idx]));
                    }

                    angular.element('#task-search').focus();
                });

                vm.tableData = function () {
                    return vm.tasks;
                };

                /*
                 * Table Config
                 */
                vm.tableConfig = {
                    order: '',
                    limit: 15,
                    page: $stateParams.pageNum || 1,
                    mdOnPaginate: function (newPageNumber) {
                        $state.go('reConnect.task.list', {
                            pageNum: newPageNumber
                        }, {
                            notify: false
                        });
                    },
                    button: {
                        show: true,
                        ctrl: {
                            action: function (task) {
                                $state.go('reConnect.task.detail', {
                                    id: task.id
                                }, {
                                    notify: true
                                });
                            },
                            ariaLabelFn: function (task) {
                                return ['Open task detail for ', task.firstName, ' ', task.lastName].join('');
                            }
                        },
                        template: '<md-button \
							aria-label="ariaLabelFn(item)" \
							ng-click="action(item)" \
							class="md-primary">View \
							</md-button>'
                    },
                    createTask: function () {
                        $state.go('reConnect.task.create', {}, {
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
