(function() {
	'use strict';

	/**
	 * @class worthClark.task
	 * @memberOf worthClark
	 */
	angular.module('worthClark.task', [
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
