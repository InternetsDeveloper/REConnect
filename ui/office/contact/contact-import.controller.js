(function () {
    'use strict';
    /**
     * @class reConnect.contact.ContactImportControler
     *
     * @param {ContactService} ContactService - @see ContactService
     * @param {IScope} $scope - Angular scope interface.
     * @param {Object} $mdToast Angular Material $mdToast service
     * @param {IStateParamsService} $stateParams - @see IStateParamsService
     * @param {ContactModel} ContactModel - @see ContactModel
     * @param {IState} $state - @see IState
     */
    angular
        .module('reConnect.contact')
        .controller('ContactImportController', ['ContactService',
			function (ContactService) {
                const vm = this;

                vm.csv = {
                    content: null,
                    header: true,
                    headerVisible: false,
                    separator: ',',
                    separatorVisible: false,
                    result: null,
                    encoding: 'ISO-8859-1',
                    encodingVisible: false
                };

                vm.templateHeaders = ['name', 'email', 'age', 'gender'];
                vm.awsResponse = null;
                vm.guid = null;

                vm.importContacts = function () {
                    var contacts = vm.csv.result;

                    ContactService.importContacts(contacts).then(function (response) {
                        vm.result = response;
                    });
                };

                vm.generateRandomID = function () {
                    var guidLength = 20,
                        incr = 0,
                        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                        text = '',
                        time = new Date().getTime();

                    for (incr = 0; incr < guidLength; incr++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }

                    return text + time;
                };

                vm.uploadFiles = function (file, errFiles) {
                    vm.guid = vm.generateRandomID();
                    vm.errFile = errFiles && errFiles[0];

                    ContactService.uploadFile(file, vm.guid).then(function (response) {
                        vm.awsResponse = response;
                    });

                    ContactService.importContacts(vm.guid).then(function (response) {
                        vm.result = response;
                    });
                };

                vm.reader = new FileReader();
                vm.fileSrc = null;

                angular.element('#csv-upload').on('change', function (evt) {
                    vm.reader.readAsText(evt.target.files[0]);

                    vm.reader.onload = function (event) {
                        vm.fileSrc = event.target.results;

                        vm.csvFile = evt.target.files[0];
                    };

                    vm.reader.readAsText(evt.target.files[0]);
                });

                vm.setFile = function () {
                    angular.element('#csv-upload').click();
                };
			}]);
})();
