(function () {
    'use strict';

    /**
     * @class reConnect.contact
     * @memberOf reConnect
     */
    angular.module('reConnect.contact', [
		'ngSanitize',
		'reConnect.utils.validations',
		'reConnect.utils.tableSearchable',
		'reConnect.utils.capitalize',
		'reConnect.utils.tsPhone',
		'reConnect.formIntegrity',
		'reConnect.utils.focusauto',
		'reConnect.utils.dateTime',
		'ngCsvImport'
	]);
})();
