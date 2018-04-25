(function() {
	'use strict';

	angular.module('worthClark.department')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.department', {
				url: '/department',
				redirectTo: 'worthClark.department.typeAssign'
			});

			$stateProvider.state('worthClark.department.typeAssign', {
				url: '/type-assign',
				title: 'Product/Services Categories & Tag Settings',
				views: {
					'content@': {
						controller: 'TagTypeAssignController',
						controllerAs: 'settings',
						templateUrl: 'html/tag-type-assign.tpl.html'
					}
				}
			});
		}]);
})();
