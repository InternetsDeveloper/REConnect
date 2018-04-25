(function() {
	'use strict';

	angular
		.module('worthClark.utils.dateRange', [])
		.directive('dateRange', ['Constants', function(Constants) {
			return {
				require: '^form',
				restrict: 'E',
				templateUrl: 'html/date-range.tpl.html',
				scope: {
					date: '=ngModel'
				},
				link: function($scope, element, attr, formCtrl) {
					$scope.formCtrl = formCtrl;
					$scope.onDateChanged = function(sourceName) {
						$scope.$emit(Constants.DATE_RANGE_CHANGE);
						if(sourceName === 'startDate') {
							angular.element(formCtrl.endDate).find('input').focus();
						}
					};
				}
			};
		}]);
})();
