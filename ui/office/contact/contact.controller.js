(function () {
    'use strict';

    /**
     * @class reConnect.contact.ContactController
     *
     * @param {Object} $mdToast Angular Material $mdToast service
     * @param {IScope} $scope - Angular scope interface.
     * @param {Object} $mdDialog = Angular Material $mdDialog service
     * @param {IStateParamsService} $stateParams - @see IStateParamsService
     * @param {ContactService} ContactService - @see ContactService
     * @param {ContactModel} ContactModel - @see ContactModel
     * @param {IState} $state - @see IState
     * @param {Object} $filter - Angular filter service
     */
    angular
        .module('reConnect.contact')
        .controller('ContactController', ['$mdToast', '$scope', '$mdDialog', '$stateParams', 'ContactService', 'ContactModel', '$state', '$filter',
			function ($mdToast, $scope, $mdDialog, $stateParams, ContactService, ContactModel, $state, $filter) {
                const vm = this;

                var cancelNotification = function () {
                        var canceled = $mdToast
                            .simple()
                            .position('top right')
                            .textContent('Cancelled deletion');

                        return $mdToast.show(canceled);
                    },
                    deleteNotification = function (deletedUsers) {
                        var deleted = $mdToast
                            .simple()
                            .position('top right')
                            .textContent('Successfully deleted ' + deletedUsers + ' user(s).');

                        return $mdToast.show(deleted);
                    },
                    noneSelected = function () {
                        var select = $mdToast
                            .simple()
                            .position('top right')
                            .textContent('No users selected');

                        return $mdToast.show(select);
                    };

                vm.contacts = [];
                vm.promise = null;
                vm.selectedContacts = function () {
                    var targetContacts = $filter('filter')(vm.contacts, {
                        checked: true
                    });

                    return targetContacts;
                };
                vm.selectedContactsLength = vm.selectedContacts().length;
                vm.import = false;

                vm.pageNum = $stateParams.pageNum || 1;

                if ($stateParams.pageNum === '') {
                    $state.go('reConnect.contact.list', {
                        pageNum: 1
                    }, {
                        notify: false
                    });
                }

                vm.showImport = function () {
                    if (vm.import) {
                        vm.import = false;
                    } else {
                        vm.import = true;
                    }
                };

                vm.pageChange = function (newPageNumber) {
                    $state.go('reConnect.contact.list', {
                        pageNum: newPageNumber
                    }, {
                        notify: false
                    });
                };

                vm.promise = ContactService.getAll().then(function (result) {
                    for (var idx = 0; idx < result.data.users.length; idx++) {
                        vm.contacts.push(new ContactModel(result.data.users[idx]));
                    }
                    angular.element('#contact-search').focus();
                });

                vm.checkAll = function () {
                    if (vm.selectAll) {
                        angular.forEach(vm.contacts, function (contact) {
                            contact.checked = false;
                        });
                        vm.selectAll = false;
                    } else {
                        angular.forEach(vm.contacts, function (contact) {
                            contact.checked = true;
                        });
                        vm.selectAll = true;
                    }
                };

                vm.deleteContact = function () {
                    var contactsForDeletion = vm.selectedContacts(),
                        contactsIds = contactsForDeletion.map(function (obj) {
                            return obj.id;
                        }),
                        deleteConfirmation = $mdDialog.confirm()
                        .title('Delete?')
                        .targetEvent('event')
                        .textContent('Are you sure you want to delete ' + contactsForDeletion.length + ' contacts?')
                        .ok('Delete')
                        .cancel('Cancel');

                    if (contactsIds.length > 0) {
                        $mdDialog.show(deleteConfirmation).then(function () {
                            ContactService.deleteContact(contactsIds).then(function (result) {
                                deleteNotification(result.data);
                            });

                            vm.contacts = vm.contacts.filter(function (contact) {
                                if (contactsIds.indexOf(contact.id) >= 0) {
                                    return false;
                                }

                                return true;
                            });
                        }, function () {
                            cancelNotification();
                        });
                    } else {
                        noneSelected();
                    }
                };

                /*
                 * Table Config
                 */
                vm.tableConfig = {
                    order: '',
                    limit: 100,
                    page: 1
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
			}]);
})();
