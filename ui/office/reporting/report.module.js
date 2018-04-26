(function () {
    'use strict';

    /**
     * @class reConnect.report
     * @memberOf reConnect
     */
    angular.module('reConnect.report', [
		'ngSanitize',
		'reConnect.utils.validations',
		'reConnect.utils.tableSearchable',
		'reConnect.utils.capitalize',
		'reConnect.utils.tsPhone',
		'reConnect.formIntegrity',
		'reConnect.utils.focusauto',
		'reConnect.utils.dateTime'
	]);
})();
