(function() {
	'use strict';

	angular
		.module('worthClark.utils.pushIn', [])
		.directive('pushIn', ['$document', function($document) {
			return {
				restrict: 'A',
				require: ['?^mdSidenav', '?^topSlideOut'],
				link: function($scope, element, attr, ctrls) {
					var body = angular.element($document[0].body),
						cssClass,
						parentCtrl = ctrls[0] || ctrls[1],
						stateChanged;

					body.addClass(attr.pushInBodyClass);
					cssClass = attr.pushInSource + '-open';
					stateChanged = function(state) {
						body[state ? 'addClass' : 'removeClass'](cssClass);
					};

					/*
					 * Overwrite default functions and forward current state to custom function
					 */
					angular.forEach(['open', 'close', 'toggle'], function(fn) {
						var org = parentCtrl[fn];

						if(parentCtrl) {
							parentCtrl[fn] = function() {
								var res = org.apply(parentCtrl);

								stateChanged(parentCtrl.isOpen());

								return res;
							};
						}
					});
				}
			};
		}]);
})();
