(function() {
	'use strict';

	angular
		.module('worthClark.dispatch')
		.filter('srList', ['$filter', '_', function($filter, _) {
			return function(srList, listFilter, promise, address, requestType, customerName, department, technician) {
				var filtered = $filter('filter')(srList, {
						customer: {
							full_name: customerName
						},
						service_request_service_address: address,
						service_request_type: requestType,
						department_name: department,
						promised_date: promise,
						promised_time: promise
					}),
					returnArr = [];

				angular.forEach(filtered, function(sr) {
					if(technician === '' || angular.isUndefined(technician) || _.some(sr.technicians, function(tech) {
						return tech.full_name.toLowerCase().indexOf(technician.toLowerCase()) > -1;
					})) {
						returnArr.push(sr);
					}
				});

				return returnArr;
			};
		}]);
})();
