(function () {
    'use strict';

    angular
        .module('reConnect.product')
        .factory('ProductModel', [productModel]);

    /**
     * Represents a product.
     * @constructor {Object} Product
     *
     * @property {Number} id
     * @property {String} title
     * @property {String} image
     * @property {Number} allocatedMinutes
     * @property {Number} allocatedMaterialCost
     * @property {Number} payrollSpiff
     * @property {Number} department
     * @property {Number} payrollCommission
     * @property {Number} equipmentFee
     * @property {Number} miscellaneousMargin
     * @property {Number} miscellaneousMarkup
     * @property {String} videoUrl
     * @property {Boolean} priceOverride
     * @property {Number} priceOverrideId
     * @property {Number} regularWithAgreement
     * @property {Number} whileHereWithAgreement
     * @property {Number} regularWithOutAgreement
     * @property {Number} whileHereWithOutAgreement
     * @property {String} description
     *
     * @param {Object} product - The product data object.
     * @param {Number} product.id - The product identification number.
     * @param {String} product.name - The product name.
     * @param {String} product.image - The product image url.
     * @param {Number} product.labor_minutes - The product labor minutes.
     * @param {Number} product.material_cost - The product material cost.
     * @param {Number} product.payroll_spiff - The product payroll spiff.
     * @param {Number} product.department - The product department.
     * @param {Number} product.payroll_commission - The product commission rate.
     * @param {Number} product.equipment_fee - The product equipment fee.
     * @param {Number} product.margins - The product miscellaneous margin.
     * @param {Number} product.markups - The product miscellaneous markup.
     * @param {String} product.video_url - The product video demo url.
     * @param {String} product.description - The product notes.
     * @param {Boolean} product.price_override - The product price override flag.
     * @param {Number} product.service_price_override_id - The product price override id.
     * @param {Number} product.regular_with_agreement - The product price with agreement override.
     * @param {Number} product.while_here_with_agreement - The product price while here with agreement override.
     * @param {Number} product.regular_with_out_agreement - The product price with out agreement override.
     * @param {Number} product.while_here_with_out_agreement - The product price price while with out agreement override.
     * @param {Object} product.tag_type - The product list of tags.
     * @param {String} product.description - The product description.
     */
    function Product(product) {
        this.id = product.id;
        this.image = product.image;
        this.title = product.name;
        this.allocatedMinutes = product.labor_minutes;
        this.allocatedMaterialCost = product.material_cost;
        this.payrollSpiff = product.payroll_spiff;
        this.department = product.department;
        this.payrollCommission = product.payroll_commission;
        this.equipmentFee = product.equipment_fee;
        this.miscellaneousMargin = product.margins;
        this.miscellaneousMarkup = product.markups;
        this.videoUrl = product.video_url;
        this.commentsOnInvoice = product.description;
        this.priceOverride = product.price_override || false;
        this.priceOverrideId = product.service_price_override_id;
        this.regularWithAgreement = product.regular_with_agreement;
        this.whileHereWithAgreement = product.while_here_with_agreement;
        this.regularWithOutAgreement = product.regular_with_out_agreement;
        this.whileHereWithOutAgreement = product.while_here_with_out_agreement;
        this.tags = product.tags || {};
        this.description = product.description;
    }

    /**
     * @function productModel
     *
     * @return {Function} - Returns a new function to be called to create a new Product object.
     */
    function productModel() {
        /**
         * Returns an instance of the Product class
         *
         * @typedef {Object} Product
         *
         * @param {Object} product - The product data object.
         *
         * @returns {Object} Product instance - Instantiates the product object
         */
        return function (product) {
            return new Product(product);
        };
    }
})();
