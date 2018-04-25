(function() {
	'use strict';

	angular
		.module('worthClark')
		.constant('Constants', {
			apiURL: api + 'api/',
			DATE_RANGE_CHANGE: 'date_range_change',
			TABLEHEAD_AUTO_FOCUS_WAIT: 1000,
			SERVICE_POLLING_INTERVAL: 15000
		});
})();
