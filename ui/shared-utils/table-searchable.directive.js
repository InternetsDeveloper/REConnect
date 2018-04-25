(function() {
	'use strict';

	angular
		.module('worthClark.utils.tableSearchable', [
			'md.data.table'
		])
		.directive('onRepeatDone', function() {
			return {
				restrict: 'A',
				link: function($scope, element) {
					if(!$scope.vm.config.button) {
						element.bind('click', function() {
							$scope.vm.action($scope.item);
							$scope.$apply();
						});
					}
				}
			};
		})
		.directive('tableSearchable', [function() {
			return {
				restrict: 'E',
				templateUrl: 'html/table-searchable.tpl.html',
				scope: {
					action: '<',
					columns: '<',
					config: '<',
					data: '<',
					filters: '<',
					pageOptions: '<',
					progress: '<',
					createItem: '<',
					createLabel: '@'

				},
				controllerAs: 'vm',
				bindToController: true,
				controller: ['$timeout', 'Constants', tsController]
			};
		}])
		.directive('dynamicTemplate', ['$compile', function($compile) {
			return {
				restrict: 'A',
				replace: true,
				transclude: true,
				scope: {
					item: '=content',
					config: '=dynamicTemplate'
				},

				link: function($scope, ele) {
					var scope = $scope.$new(true);

					scope.item = $scope.item;
					angular.extend(scope, $scope.config.ctrl || {});
					ele.html($scope.config.template);

					$compile(ele.contents())(scope);
				}
			};
		}]);


	function tsController($timeout, Constants, $compile) {
		var vm = this;

		vm.stopSort = function(evt) {
			evt.stopPropagation();
		};

		vm.setPage = function() {
			vm.config.page = 1;
		};


		vm.columnCount = 5;
		vm.toggleColumn = function(column) {
			var MAX_COLUMNS = 5;

			if(vm.columnCount < MAX_COLUMNS && !column.show) {
				column.show = true;
				vm.columnCount++;
			} else if(column.show) {
				column.show = false;
				vm.columnCount--;
			}
		};

		vm.options = angular.extend({
			rowSelection: true,
			multiSelect: true,
			autoSelect: true,
			decapitate: false,
			largeEditDialog: false,
			boundaryLinks: false,
			limitSelect: true,
			pageSelect: true
		}, vm.options);

		vm.getButton = function(item, btnConfig) {
			var ele = $compile(btnConfig.template)(btnConfig.scope);

			angular.element('div').append(ele);
		};

		vm.parseValue = function(item, key) {
			var keyArr = key.split('.'),
				value = item;

			if(keyArr.length === 1) {
				value = value[keyArr.pop()];
			} else {
				while(keyArr.length > 0) {
					value = value[keyArr.shift()];
				}
			}

			return value;
		};


		function autoFocus() {
			$timeout(function() {
				var el = angular.element.find('th[md-column]:first input:first');

				if(el && el[0]) {
					el[0].focus();
				}
			}, Constants.TABLEHEAD_AUTO_FOCUS_WAIT);
		}

		autoFocus();
	}
})();
