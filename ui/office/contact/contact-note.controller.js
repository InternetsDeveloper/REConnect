/**
 * Created by nerdymurphy on 7/6/17.
 */
(function () {
    'use strict';

    /**
     * @class reConnect.contact.ContactDetailController
     *
     * @param {Object} $mdToast Angular Material $mdToast service
     * @param {IScope} $scope - Angular scope interface.
     * @param {IStateParamsService} $stateParams - @see IStateParamsService
     * @param {DocumentService} $document - Angular $document service
     * @param {NoteService} NoteService - @see NoteService
     * @param {IState} $state - @see IState
     */
    angular
        .module('reConnect.contact')
        .controller('ContactNoteController', ['$mdToast', '$scope', '$stateParams', '$document', 'NoteService',
			function ($mdToast, $scope, $stateParams, $document, NoteService) {
                const vm = this;

                var successNotification = function () {
                    var succeeded = $mdToast
                        .simple()
                        .position('top right')
                        .textContent('Successfully created a note.');

                    return $mdToast.show(succeeded);
                };

                vm.contactId = $stateParams.id;

                vm.openNoteForm = function () {
                    angular.element($document.find('#notes')).removeClass('ng-hide');
                };

                vm.closeNoteForm = function () {
                    angular.element($document.find('#notes')).addClass('ng-hide');
                };

                vm.noteDescription = '';

                vm.saveNote = function () {
                    var note = {
                        contactId: vm.contactId,
                        noteDescription: vm.noteDescription
                    };

                    NoteService.save(note).then(function (response) {
                        vm.response = response;
                        vm.noteDescription = '';
                        successNotification();
                    });
                };
			}]);
})();
