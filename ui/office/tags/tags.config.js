(function() {
	'use strict';

	angular.module('worthClark.tags')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.tags', {
				url: '/tags',
				redirectTo: 'worthClark.tags.typeAssign'
			});
		}]);
})();
