(function () {
    'use strict';

    /**
     * @class reConnect.propertymanagement
     * @memberOf reConnect
     */
    angular.module('reConnect.propertymanagement', [
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
