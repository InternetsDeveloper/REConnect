(function() {
	'use strict';

	/**
	 * @class worthClark.report
	 * @memberOf worthClark
	 */
	angular.module('worthClark.report', [
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
