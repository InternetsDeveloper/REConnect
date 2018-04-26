(function () {
    'use strict';

    /**
     * @class ProductService
     *
     * @memberOf reConnect.product
     * @description This is the service to interact with all product APIs.
     *
     * @param {IHttpService} $http - Angular $http service.
     * @param {UploadService} UploadService - @see UploadService
     * @param {Constants} Constants - App constants object.
     *
     * @returns {Object} - Returns the functions available for this service.
     */
    angular
        .module('reConnect.product')
        .factory('ProductService', ['$http', 'UploadService', 'Constants', function ($http, UploadService, Constants) {
            return {
                setActiveDepartment: setActiveDepartment,
                getActiveDepartment: getActiveDepartment,
                getActiveFilters: getActiveFilters,
                fetchProduct: fetchProduct,
                searchProduct: searchProduct,
                getAllTags: getAllTags,
                updateProduct: updateProduct,
                updateTag: updateTag,
                createProduct: createProduct,
                createTag: createTag,
                uploadCSV: uploadCSV
            };

            /**
             * Sets the active department. Store the active department so the UI can
             * return the user to the previous state upon cancel of edit product. This
             * is likely to be refactored in favor of query string state persistence.
             *
             * @param {Number} id - The department id to store. prefixed with t becuase
             * filter's apparently need this.
             *
             * @return {void}.
             */
            function setActiveDepartment(id) {
                this.activeDepartment = 't' + id;
            }

            /**
             * Gets the active department. This
             * is likely to be refactored in favor of query string state persistence.
             *
             * @param {Number} id - The department id to store.
             *
             * @return {void}.
             */
            function getActiveDepartment() {
                return this.activeDepartment;
            }

            /**
             * Gets the active filter set.
             *
             * @return {Object}.
             */

            function getActiveFilters() {
                this.activefilters = this.activefilters || {
                    readOnly: true,
                    removable: true,
                    data: [],
                    remove: function (tag) {
                        tag.checked = false;
                    }
                };

                return this.activefilters;
            }

            /**
             * Get a single product.
             *
             * @param {Number} id - The product's id to get.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function fetchProduct(id) {
                return $http.get(Constants.apiURL + 'service/service/' + id);
            }

            /**
             * Get the full list of products.
             *
             * @param {Number} departmentId - The departmentId id used to get product for a specific department.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function searchProduct(departmentId) {
                return $http.get(Constants.apiURL + 'service/service?service_department=' + departmentId);
            }

            /**
             * Get the full list of product tags.
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function getAllTags() {
                return $http.get(Constants.apiURL + 'service/department');
            }

            /**
             * Create an existing product.
             *
             * @param {Product} Product - @see {Product}
             * @param {File} image - the product image
             *
             * @return {IPromise} - Returns an Angular promise.
             */
            function createProduct(Product) {
                return $http.post(Constants.apiURL + 'service/service', {
                    name: Product.title,
                    labor_minutes: Product.allocatedMinutes,
                    material_cost: Product.allocatedMaterialCost,
                    payroll_spiff: Product.payrollSpiff,
                    payroll_commission: Product.payrollCommission,
                    equipment_fee: Product.equipmentFee,
                    margins: Product.miscellaneousMargin,
                    markups: Product.miscellaneousMarkup,
                    video_url: Product.videoUrl,
                    description: Product.description,
                    tags: Product.tags,
                    service_department: Product.department,
                    overrides: {
                        regular_with_agreement: Product.regularWithAgreement,
                        while_here_with_agreement: Product.whileHereWithAgreement,
                        regular_with_out_agreement: Product.regularWithOutAgreement,
                        while_here_with_out_agreement: Product.whileHereWithOutAgreement
                    }
                });
            }

            /**
             * Update an existing product.
             *
             * @param {Product} Product - @see {Product}
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function updateProduct(Product) {
                return $http.put(Constants.apiURL + 'service/service/' + Product.id, {
                    name: Product.title,
                    labor_minutes: Product.allocatedMinutes,
                    material_cost: Product.allocatedMaterialCost,
                    payroll_spiff: Product.payrollSpiff,
                    department: Product.department,
                    payroll_commission: Product.payrollCommission,
                    equipment_fee: Product.equipmentFee,
                    margins: Product.miscellaneousMargin,
                    markups: Product.miscellaneousMarkup,
                    video_url: Product.videoUrl,
                    description: Product.description,
                    tags: Product.tags,
                    service_department: Product.department,
                    overrides: {
                        regular_with_agreement: Product.regularWithAgreement,
                        while_here_with_agreement: Product.whileHereWithAgreement,
                        regular_with_out_agreement: Product.regularWithOutAgreement,
                        while_here_with_out_agreement: Product.whileHereWithOutAgreement
                    }
                });
            }

            /**
             * Create an existing product.
             *
             * @param {ProductTag} ProductTag - @see {ProductTag}
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function createTag(ProductTag) {
                return $http.post(Constants.apiURL + 'product/tag', ProductTag);
            }

            /**
             * Upload product/service csv to S3
             *
             * @param {File} csv - csv file.
             *
             * @return {IHttpPromise} - Returns an Angular http promise.
             */
            function uploadCSV(csv) {
                return UploadService.uploadCsv(csv);
            }

            /**
             * Update an existing product.
             *
             * @param {ProductTag} ProductTag - @see {ProductTag}
             *
             * @return {IHttpPromise} - Returns an Angular promise.
             */
            function updateTag(ProductTag) {
                return $http.put(Constants.apiURL + 'product/tag/' + ProductTag.id, ProductTag);
            }
		}]);
})();
