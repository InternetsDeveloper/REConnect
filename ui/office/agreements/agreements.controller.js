(function () {
    'use strict';

    /**
     * @class reConnect.agreements.AgreementsController
     * @memberOf reConnect.agreements
     *
     * @param {IStateService} $state - @see IStateService
     * @param {IStateParamsService} $stateParams - @see IStateParamsService
     * @param {ISidenavService} $mdSidenav - @see ISidenavService
     * @param {AgreementService} AgreementService - @see {AgreementService}
     * @param {AgreementModel} AgreementModel - @see {AgreementModel}
     * @param {FormIntegrity} FormIntegrity - @see {FormIntegrity}
     */
    angular
        .module('reConnect.agreements')
        .controller('AgreementsController', ['$state', '$stateParams', '$mdSidenav', 'AgreementService', 'AgreementModel', 'FormIntegrity',
			function ($state, $stateParams, $mdSidenav, AgreementService, AgreementModel, FormIntegrity) {
                var vm = this;

                vm.list = [];
                vm.promise = null;
                vm.formIntegrity = FormIntegrity;
                vm.currentDate = moment().toDate();

                vm.pageNum = $stateParams.pageNum || 1;

                if ($stateParams.pageNum === null) {
                    $state.go('reConnect.agreements.list', {
                        pageNum: 1
                    }, {
                        notify: false
                    });
                }

                vm.pageChange = function (newPageNumber) {
                    $state.go('reConnect.agreements.list', {
                        pageNum: newPageNumber
                    }, {
                        notify: false
                    });
                };

                vm.promise = AgreementService.getAll().then(function (result) {
                    for (var idx = 0; idx < result.data.agreement.length; idx++) {
                        vm.list.push(new AgreementModel(result.data.agreement[idx]));
                    }
                });

                /*
                 * Table Config
                 */
                vm.tableConfig = {
                    order: '',
                    limit: 15,
                    page: vm.pageNum
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

                vm.toggleEdit = function () {
                    $mdSidenav('edit').toggle();
                };

                /*
                 * Editing
                 */
                vm.editing = null;

                vm.edit = function (id) {
                    AgreementService.fetch(id).then(function (response) {
                        vm.editing = AgreementModel(response.data);
                        vm.toggleEdit();
                    });
                };

                /*
                 * New Agreement
                 */
                vm.create = function () {
                    vm.editing = AgreementModel({});
                    vm.toggleEdit();
                };

                vm.submit = function () {
                    if (vm.editing.id) {
                        AgreementService.update(vm.editing).then(function (response) {
                            vm.formIntegrity.setPristine();
                            vm.toggleEdit();
                            var index = _.indexOf(vm.list, _.find(vm.list, {
                                id: vm.editing.id
                            }));

                            vm.list[index] = new AgreementModel(response.data);
                            vm.editing = null;
                        });
                    } else {
                        AgreementService.create(vm.editing).then(function (response) {
                            vm.formIntegrity.setPristine();
                            vm.toggleEdit();
                            vm.list.unshift(new AgreementModel(response.data));
                            vm.editing = null;
                        });
                    }
                };

                vm.cancel = function () {
                    vm.editing = null;
                    vm.toggleEdit();
                };

                /*
                 * Display Number of reminder fields
                 */
                vm.reminders = function () {
                    vm.remindersList = vm.editing.numberOfReminders ? new Array(parseInt(vm.editing.numberOfReminders, 10)) : [];

                    return vm.remindersList;
                };
			}]);
})();
