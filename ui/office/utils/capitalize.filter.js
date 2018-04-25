(function() {
	'use strict';

	angular
		.module('worthClark.utils.capitalize', [])
		.filter('capitalize', function() {
			return function(input) {
				var convertedInput;

				if(input !== null && angular.isDefined(input)) {
					convertedInput = input.toLowerCase();

					return convertedInput.substring(0, 1).toUpperCase() + convertedInput.substring(1);
				}

				return '';
			};
		});
})();
