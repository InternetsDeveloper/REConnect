(function () {
    'use strict';

    angular
        .module('reConnect.utils.sidenavPushIn', [])
        .directive('sidenavPushIn', ['$document', function ($document) {
            return {
                restrict: 'A',
                require: '^mdSidenav',
                link: function ($scope, element, attr, sidenavCtrl) {
                    var body = angular.element($document[0].body),
                        cssClass, stateChanged;

                    body.addClass('md-sidenav-push-in');

                    cssClass = (element.hasClass('md-sidenav-left') ? 'md-sidenav-left' : 'md-sidenav-right') + '-open';
                    stateChanged = function (state) {
                        body[state ? 'addClass' : 'removeClass'](cssClass);
                    };

                    /*
                     * Overwrite default functions and forward current state to custom function
                     */
                    angular.forEach(['open', 'close', 'toggle'], function (fn) {
                        var org = sidenavCtrl[fn];

                        sidenavCtrl[fn] = function () {
                            var res = org.apply(sidenavCtrl);

                            stateChanged(sidenavCtrl.isOpen());

                            return res;
                        };
                    });
                }
            };
		}]);
})();
