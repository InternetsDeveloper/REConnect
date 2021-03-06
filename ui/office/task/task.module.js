(function () {
    'use strict';

    /**
     * @class reConnect.task
     * @memberOf reConnect
     */
    angular.module('reConnect.task', [
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
