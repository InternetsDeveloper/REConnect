(function () {
    'use strict';

    /**
     * @class reConnect.home
     * @memberOf reConnect
     */
    angular.module('reConnect.home', [
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
