(function () {
    'use strict';

    angular
        .module('reConnect.formIntegrity', [])
        .factory('FormIntegrity', ['$mdDialog', '$state', '$document', '$transitions', function ($mdDialog, $state, $document, $transitions) {
            var self = {};

            self.listenForTransitions = function () {
                $transitions.onStart({
                    to: '**'
                }, onTransitionStart);

                function onTransitionStart(evt) {
                    var value = true;

                    if (self.isAnyActiveFormDirty()) {
                        value = self.showConfirmation({
                            scope: self,
                            evt: evt
                        });
                    } else {
                        self.clearActiveForm();
                    }

                    return value;
                }
            };

            self.setPristine = function () {
                if (self.activeForm) {
                    self.activeForm.$setPristine();
                }
            };

            self.isAnyActiveFormDirty = function () {
                var dirty = false;

                if (self.activeForm && self.activeForm.$dirty) {
                    dirty = true;
                }

                return dirty;
            };

            self.clearActiveForm = function () {
                if (self.activeForm) {
                    Reflect.deleteProperty(self.activeForm);
                }
            };

            self.setActiveForm = function (form) {
                self.activeForm = form;
            };

            self.clearActiveDialog = function () {
                $mdDialog.cancel();
            };

            self.isActiveDialogPresent = function () {
                return angular.element($document[0].body).hasClass('md-dialog-is-showing');
            };

            self.showConfirmation = function (data) {
                var aSelf = self,
                    liveDialog = self.isActiveDialogPresent(),
                    mdConfirm = !liveDialog && $mdDialog.confirm() // *
                    .title('You have unsaved changes.')
                    .textContent('Press Cancel to remain on this screen or Continue to leave and discard your changes.')
                    .targetEvent(data.event)
                    .ariaLabel('Remain on this screen or leave and discard unsaved changes.')
                    .ok('Continue')
                    .cancel('Cancel');

                return !liveDialog && $mdDialog.show(mdConfirm).then(function () {
                    $mdDialog.cancel();
                    aSelf.activeForm.$setPristine();

                    return true;
                }, function () {
                    aSelf.clearActiveDialog();

                    return false;
                });

                // * Each of the items above are somewhat necessitated by effects resulting
                // from the redirect at list roots making a second routing call.
            };

            self.listenForTransitions();

            return {
                clearActiveDialog: self.clearActiveDialog,
                setActiveForm: self.setActiveForm,
                clearActiveForm: self.clearActiveForm,
                showConfirmation: self.showConfirmation,
                isActiveDialogPresent: self.isActiveDialogPresent,
                isAnyActiveFormDirty: self.isAnyActiveFormDirty,
                setPristine: self.setPristine
            };
		}]);
})();