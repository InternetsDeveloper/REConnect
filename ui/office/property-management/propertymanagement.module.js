(function() {
	'use strict';

	/**
	 * @class worthClark.propertymanagement
	 * @memberOf worthClark
	 */
	angular.module('worthClark.propertymanagement', [
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
