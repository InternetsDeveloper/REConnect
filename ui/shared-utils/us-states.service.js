(function () {
    'use strict';

    /**
     * @function USStatesService
     * @memberOf reConnect
     * @description This is the service to resolve state values.
     *
     * @param {USStates} USStates - App USStates object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.utils.statesService', [])
        .factory('USStatesService', ['USStates', function (USStates) {
            var states = USStates;

            function querySearch(query) {
                return query ? states.filter(createFilterFor(query)) : states;
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return angular.lowercase(state.name).indexOf(lowercaseQuery) === 0 ||
                        angular.lowercase(state.abbreviation).indexOf(lowercaseQuery) === 0;
                };
            }

            return {
                querySearch: querySearch
            };
		}]);
})();
