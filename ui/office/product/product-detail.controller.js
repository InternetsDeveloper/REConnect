(function () {
    'use strict';

    /**
     * @class reConnect.product.ProductCreateController
     *
     * @param {IWindowService} $window - Angular window service.
     * @param {IFilterService} $filter - Angular filter service.
     * @param {IScope} $scope - Angular scope service.
     * @param {$state} $state - UI Router state service.
     * @param {$state} $stateParams - UI Router state parameters service.
     * @param {ProductModel} ProductModel - @see ProductModel
     * @param {ProductTagModel} ProductTagModel - @see ProductTagModel
     * @param {ProductService} ProductService - @see ProductService
     * @param {DepartmentService} DepartmentService - @see DepartmentService
     * @param {FormIntegrity} FormIntegrity - @see FormIntegrity
     */
    angular
        .module('reConnect.product')
        .controller('ProductDetailController', ['$window', '$filter', '$scope', '$state', '$stateParams', 'ProductModel',
			'ProductTagModel', 'ProductService', 'DepartmentService', 'FormIntegrity',
			function ($window, $filter, $scope, $state, $stateParams, ProductModel, ProductTagModel,
                ProductService, DepartmentService, FormIntegrity) {
                var vm = this;

                vm.formIntegrity = FormIntegrity;
                /*
                 * Initialize
                 */
                function dataLoad() {
                    DepartmentService.getAll().then(function (result) {
                        vm.departments = result.data.department;
                    }).then(function () {
                        ProductService.getAllTags().then(function (response) {
                            var tags = vm.model.tags;

                            vm.model.tags = {};

                            _.forEach(response.data.department, function (dept) {
                                vm.tags['t' + dept.id] = dept.tag_types;
                                vm.depts.push({
                                    id: dept.id,
                                    name: dept.name
                                });

                                if (dept.id === vm.model.department) {
                                    _.forEach(tags, function (tag, index) {
                                        _.forEach(vm.tags['t' + dept.id], function (tagType) {
                                            _.forEach(tagType.tags, function (tagData) {
                                                if (tags[index] !== null && tag.id === tagData.id) {
                                                    tagData.checked = true;
                                                    vm.chipSet(tagData, tagType.name);

                                                    tags[index] = null;

                                                    return false;
                                                }

                                                return true;
                                            });
                                        });
                                    });
                                }
                            });

                            _.forEach(tags, function (tag) {
                                if (tag !== null) {
                                    vm.chipSet(tag, tag.tag_type);
                                }
                            });
                        });
                    });
                }

                vm.model = new ProductModel({});

                vm.hideProductTags = false;
                vm.calcHideProductTags = function () {
                    return vm.hideProductTags && $window.matchMedia('(max-width: 959px)').matches;
                };

                /*
                 * Load Existing Product
                 */
                if ($stateParams.id) {
                    ProductService.fetchProduct($stateParams.id).then(function (response) {
                        vm.model = new ProductModel(response.data);

                        dataLoad();
                    });
                } else {
                    dataLoad();
                }

                /*
                 * Advanced Options
                 */
                vm.showAdvancedOptions = false;

                vm.toggleAdvancedOptions = function () {
                    vm.showAdvancedOptions = !vm.showAdvancedOptions;
                };

                /*
                 * Pricing Calculation and Display
                 */

                vm.currencyPattern = '^(\\d+\\.\\d{2})|\\d+$';

                /**
                 * @name displayPricing
                 *
                 * @param {Number} value - The typed in override value.
                 *
                 * @returns {String} - A currency string in US Dollars with 2 decimal points.
                 */
                function displayPricing(value) {
                    var DECIMAL_POINTS = 2;

                    if (vm.model.priceOverride && value) {
                        return $filter('currency')(value, '$', DECIMAL_POINTS);
                    }

                    return $filter('currency')(0, '$', DECIMAL_POINTS);
                }

                vm.displayRegWithSa = function () {
                    return displayPricing(vm.model.regularWithAgreement);
                };

                vm.displayRegWithOutSa = function () {
                    return displayPricing(vm.model.regularWithOutAgreement);
                };

                vm.displayWwhWithSa = function () {
                    return displayPricing(vm.model.whileHereWithAgreement);
                };

                vm.displayWwhWithOutSa = function () {
                    return displayPricing(vm.model.whileHereWithOutAgreement);
                };

                /*
                 * Image
                 */
                angular.element('#image-upload').on('change', function (evt) {
                    var reader = new FileReader();

                    reader.onload = function (event) {
                        vm.imgSrc = event.target.result;

                        $scope.$apply();

                        vm.image = evt.target.files[0];
                    };

                    reader.readAsDataURL(evt.target.files[0]);
                });

                vm.imgSrc = '/images/product-placeholder.png';

                vm.setImg = function () {
                    angular.element('#image-upload').click();
                };

                /*
                 * Save and Cancel
                 */

                vm.isSaving = false;

                vm.submit = function () {
                    vm.isSaving = true;

                    if ($stateParams.id) {
                        ProductService.updateProduct(vm.model).then(function () {
                            vm.formIntegrity.setPristine();
                            $state.go('reConnect.product.search');
                        });
                    } else {
                        ProductService.createProduct(vm.model).then(function (response) {
                            vm.formIntegrity.setPristine();
                            $state.go('reConnect.product.edit', {
                                id: response.data.id
                            });
                        });
                    }
                };

                /*
                 * Product Tags
                 */
                vm.chips = {
                    readOnly: true,
                    removable: true,
                    data: [],
                    remove: function (tag) {
                        tag.checked = false;

                        if (vm.model.tags[tag.tag_type].indexOf(tag.name) > -1) {
                            vm.model.tags[tag.tag_type].splice(
                                vm.model.tags[tag.tag_type].indexOf(tag.name), 1
                            );
                        }
                    }
                };

                vm.chipSet = function (tag, key) {
                    if (angular.isUndefined(vm.model.tags[key])) {
                        vm.model.tags[key] = [];
                    }

                    if (vm.chips.data.indexOf(tag) > -1) {
                        vm.chips.data.splice(vm.chips.data.indexOf(tag), 1);
                        vm.model.tags[key].splice(
                            vm.model.tags[key].indexOf(tag.name), 1
                        );
                    } else {
                        vm.chips.data.push(tag);
                        vm.model.tags[key].push(tag.name);
                    }
                };

                vm.reset = function () {
                    vm.model.tags = {};
                    vm.chips.data = [];

                    _.forEach(vm.tags, function (dept) {
                        _.forEach(dept, function (deptTags) {
                            _.forEach(deptTags.tags, function (deptTag) {
                                deptTag.checked = false;
                            });
                        });
                    });
                };

                vm.tagLimit = {};
                vm.tags = {};
                vm.depts = [];

                vm.changeLimit = function (deptId, $index) {
                    var DEFAULT_LIMIT = 5;

                    vm.tagLimit[$index] = vm.tagLimit[$index] === DEFAULT_LIMIT || angular.isUndefined(vm.tagLimit[$index]) ?
                        vm.tags[deptId][$index].tags.length : DEFAULT_LIMIT;
                };
			}]);
})();
