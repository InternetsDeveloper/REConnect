(function() {
	'use strict';

	angular
		.module('worthClark.utils.dateTime', [])
		.directive('dateTime', function() {
			return {
				require: '^form',
				restrict: 'E',
				templateUrl: 'html/date-time.tpl.html',
				scope: {
					date: '=ngModel'
				},
				link: function($scope, element, attr, formCtrl) {
					$scope.formCtrl = formCtrl;
					$scope.minDate = moment().startOf('day').toDate();
				}
			};
		});
})();
