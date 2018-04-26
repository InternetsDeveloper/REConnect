(function () {
    'use strict';

    /**
     * @class reConnect.customer
     * @memberOf reConnect
     */
    angular.module('reConnect.customer', [
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
