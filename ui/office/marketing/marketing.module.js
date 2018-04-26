(function () {
    'use strict';

    /**
     * @class reConnect.marketing
     * @memberOf reConnect
     */
    angular.module('reConnect.marketing', [
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
