(function() {
	'use strict';

	/**
	 * @class worthClark.customer
	 * @memberOf worthClark
	 */
	angular.module('worthClark.customer', [
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
