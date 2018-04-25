(function() {
	'use strict';

	/**
	 * @class worthClark.marketing
	 * @memberOf worthClark
	 */
	angular.module('worthClark.marketing', [
		'ngSanitize',
		'worthClark.utils.validations',
		'worthClark.utils.tableSearchable',
		'worthClark.utils.capitalize',
		'worthClark.utils.tsPhone',
		'worthClark.formIntegrity',
		'worthClark.utils.focusauto',
		'worthClark.utils.dateTime'
	]);
})();