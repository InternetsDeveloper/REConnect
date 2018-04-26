(function () {
    'use strict';

    angular
        .module('reConnect.technician')
        .factory('TechnicianService', ['$http', 'Constants', 'UploadService', function ($http, Constants, UploadService) {
            return {
                fetch: fetch,
                getAll: getAll,
                create: create,
                update: update,
                uploadImage: uploadImage
            };

            /**
             * Get a single technician.
             *
             * @param {Number} id - The service requests's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetch(id) {
                return $http.get(Constants.apiURL + 'technician/technician/' + id);
            }

            /**
             * Get a list of all possible technicians.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAll() {
                return $http.get(Constants.apiURL + 'technician/technician');
            }

            /**
             * Create a new technician.
             *
             * @param {Technician} Technician - @see {Technician}
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function create(Technician) {
                return $http.post(Constants.apiURL + 'technician/technician', {
                    first_name: Technician.first,
                    last_name: Technician.last,
                    phone: Technician.primaryPhone,
                    bio: Technician.biography,
                    avatar: Technician.avatar,
                    user: {
                        email: Technician.email
                    }
                });
            }

            /**
             * Update an existing technician.
             *
             * @param {Technician} Technician - @see {Technician}
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function update(Technician) {
                return $http.put(Constants.apiURL + 'technician/technician/' + Technician.id, {
                    first_name: Technician.first,
                    last_name: Technician.last,
                    phone: Technician.primaryPhone,
                    bio: Technician.biography,
                    avatar: Technician.avatar
                });
            }

            /**
             * Upload technician image to S3
             *
             * @param {File} image - Image file.
             *
             * @return {IHttpPromise} - Returns an Angular http promise.
             */
            function uploadImage(image) {
                return UploadService.uploadImage(image);
            }
		}]);
})();
