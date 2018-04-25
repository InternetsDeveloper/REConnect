(function() {
	'use strict';

	/**
	 * @class worthClark.contact
	 * @memberOf worthClark
	 */
	angular.module('worthClark.contact', [
		'ngSanitize',
		'worthClark.utils.validations',
		'worthClark.utils.tableSearchable',
		'worthClark.utils.capitalize',
		'worthClark.utils.tsPhone',
		'worthClark.formIntegrity',
		'worthClark.utils.focusauto',
		'worthClark.utils.dateTime',
		'ngCsvImport'
	]);
})();
