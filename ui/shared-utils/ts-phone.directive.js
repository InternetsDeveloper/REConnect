(function () {
    'use strict';

    angular
        .module('reConnect.utils.tsPhone', [])
        .constant('TSPhoneConst', {
            DIGITS: 10,
            KEY_91: 91,
            KEY_15: 15,
            KEY_19: 19,
            KEY_37: 37,
            KEY_40: 40,
            VALUE_1: 1,
            VALUE_2: 2,
            VALUE_3: 3,
            VALUE_7: 7
        })
        .directive('tsPhone', ['$document', '$filter', '$browser', 'TSPhoneConst', function ($document, $filter, $browser, TSPhoneConst) {
            return {
                restrict: 'A',
                require: '^ngModel',
                link: function ($scope, $element, $attrs, ngModelCtrl) {
                    var listener = function () {
                        var value = $element.val().replace(/[^0-9]/g, '');

                        $element.val($filter('tel')(value, false));
                    };

                    // This runs when we update the text field
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue.replace(/[^0-9]/g, '').slice(0, TSPhoneConst.DIGITS);
                    });

                    // This runs when the model gets updated on the scope directly and keeps our view in sync
                    ngModelCtrl.$render = function () {
                        $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                    };

                    $element.bind('change', listener);
                    $element.bind('keydown', function (event) {
                        var key = event.keyCode;

                        // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                        // This lets us support copy and paste too
                        if (key === TSPhoneConst.KEY_91 ||
                            TSPhoneConst.KEY_15 < key && key < TSPhoneConst.KEY_19 ||
                            TSPhoneConst.KEY_37 <= key && key <= TSPhoneConst.KEY_40) {
                            return;
                        }
                        $browser.defer(listener); // Have to do this or changes don't get picked up properly
                    });

                    $element.bind('paste cut', function () {
                        $browser.defer(listener);
                    });
                }
            };
		}])
        .filter('tel', ['TSPhoneConst', function (TSPhoneConst) {
            return function (tel) {
                if (!tel) {
                    return '';
                }

                var city, number,
                    value = tel.toString().trim().replace(/^\+/, '');

                if (value.match(/[^0-9]/)) {
                    return tel;
                }

                switch (value.length) {
                    case TSPhoneConst.VALUE_1:
                    case TSPhoneConst.VALUE_2:
                    case TSPhoneConst.VALUE_3:
                        city = value;
                        break;
                    default:
                        city = value.slice(0, TSPhoneConst.VALUE_3);
                        number = value.slice(TSPhoneConst.VALUE_3);
                }

                if (number) {
                    if (number.length > TSPhoneConst.VALUE_3) {
                        number = number.slice(0, TSPhoneConst.VALUE_3) + '-' + number.slice(TSPhoneConst.VALUE_3, TSPhoneConst.VALUE_7);
                    }

                    return ('(' + city + ') ' + number).trim();
                }

                return '(' + city;
            };
		}]);
})();
