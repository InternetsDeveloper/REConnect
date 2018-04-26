(function () {
    'use strict';

    angular
        .module('reConnect.note')
        .factory('NoteService', ['$http', 'Constants', function ($http, Constants) {
            return {
                save: save
            };

            /**
             * @param {String} note - The note text.
             *
             * @returns {Object} - Angular differed object.
             */
            function save(note) {
                var noteToSave = angular.toJson(note);

                return $http.post(Constants.apiURL + 'note', noteToSave);
            }
		}]);
})();
