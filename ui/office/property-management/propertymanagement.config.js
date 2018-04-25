(function() {
	'use strict';

	angular.module('worthClark.propertymanagement')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.propertymanagement', {
				url: '/propertymanagement',
				title: 'PropertyManagement',
				views: {
					'content@': {
						controller: 'PropertyManagementController',
						controllerAs: 'propertymanagement',
						templateUrl: 'html/propertymanagement.tpl.html'
					}
				}
			});
		}]);
})();
