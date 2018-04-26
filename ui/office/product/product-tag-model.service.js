(function () {
    'use strict';

    angular
        .module('reConnect.product')
        .factory('ProductTagModel', [productTagModel]);

    /**
     * Represents a product tag.
     * @constructor {Object} ProductTag
     *
     * @property {Number} id
     *
     * @param {Object} productTag - The product tag data object.
     * @param {Number} productTag.id - The product tag identification number.
     * @param {String} productTag.name - The product tag name.
     */
    function ProductTag(productTag) {
        this.id = productTag.id;
        this.name = productTag.name;
    }

    /**
     * @function productTagModel
     *
     * @return {Function} - Returns a new function to be called to create a new ProductTag object.
     */
    function productTagModel() {
        /**
         * Returns an instance of the ProductTag class
         *
         * @typedef {Object} ProductTag
         *
         * @param {Object} productTag - The product tag data object.
         *
         * @returns {Object} ProductTag instance - Instantiates the product tag object
         */
        return function (productTag) {
            return new ProductTag(productTag);
        };
    }
})();
