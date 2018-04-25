(function() {
	'use strict';

	angular
		.module('worthClark.filters.technician', [])
		.filter('sbTech', [sbTechFilter]);

	function sbTechFilter() {
		return function(techs, departmentId, locationId) {
			var filtered = [];

			angular.forEach(techs, function(tech) {
				if((departmentId === null || angular.isUndefined(departmentId) ||
					tech.departments.filter(filterById.bind(null, departmentId)).length > 0) &&
					(locationId === null || angular.isUndefined(locationId) || tech.locations.filter(filterById.bind(null, locationId)).length > 0)) {
					filtered.push(tech);
				}
			});

			return filtered;
		};
	}

	function filterById(id, obj) {
		return obj.id === id;
	}
})();
