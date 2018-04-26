(function () {
    'use strict';

    // This is not to be done without explicit reason and a sign-off
    /* eslint "max-lines": "off" */

    /**
     * @class reConnect.product.ProductSearchController
     * @memberOf reConnect.product
     *
     * @param {IFilterProvider} $filter - Angular filter provider.
     * @param {ProductService} ProductService - @see {ProductService}
     * @param {ProductModel} ProductModel - @see {ProductModel}
     */
    angular
        .module('reConnect.product')
        .controller('ProductSearchController', ['$filter', 'ProductService', 'ProductModel',
			function ($filter, ProductService, ProductModel) {
                var cleanDepartmentKey = function (key) {
                        var cleanKey = key,
                            index;

                        if (angular.isString(key)) {
                            index = key.indexOf('t');
                            cleanKey = Number(key.slice(index + 1, key.length));
                        }

                        return cleanKey;
                    },
                    vm = this;

                /*
                 * Table Config
                 */
                vm.tableConfig = {
                    order: '',
                    limit: 15,
                    page: 1
                };

                vm.tableLayout = {
                    productName: {
                        label: 'Product Name',
                        key: 'title',
                        show: true,
                        searchText: ''
                    },
                    basePrice: {
                        label: 'Base Price',
                        key: 'regularWithAgreement',
                        show: true,
                        searchText: ''
                    },
                    laborMinutes: {
                        label: 'Labor Minutes',
                        key: 'allocatedMinutes',
                        show: true,
                        searchText: ''
                    },
                    materialCost: {
                        label: 'Material Cost',
                        key: 'allocatedMaterialCost',
                        show: true,
                        searchText: null
                    },
                    priceOverrides: {
                        label: 'Price Overrides',
                        key: 'priceOverride',
                        show: true,
                        searchText: null
                    },
                    productId: {
                        label: 'Product ID',
                        key: 'id',
                        show: true,
                        searchText: null
                    },
                    payrollSpiff: {
                        label: 'Payroll Spiff',
                        key: 'payrollSpiff',
                        show: false,
                        searchText: null
                    },
                    payrollMargin: {
                        label: 'Payroll Margin',
                        key: 'payrollCommission',
                        show: false,
                        searchText: null
                    },
                    productMargin: {
                        label: 'Product Margin',
                        key: 'miscellaneousMargin',
                        show: false,
                        searchText: null
                    },
                    productMarkup: {
                        label: 'Product Markup',
                        key: 'miscellaneousMarkup',
                        show: false,
                        searchText: null
                    },
                    productDescription: {
                        label: 'Product Description',
                        key: 'description',
                        show: false,
                        searchText: null
                    }
                };

                vm.tableFilter = function () {
                    var filters = {
                        keys: {},
                        isEmpty: true
                    };

                    if (vm.tableLayout.productName.searchText) {
                        filters.keys.title = vm.tableLayout.productName.searchText;
                    }

                    if (vm.tableLayout.basePrice.searchText) {
                        filters.keys.regularWithAgreement = vm.tableLayout.basePrice.searchText;
                    }

                    if (vm.tableLayout.laborMinutes.searchText) {
                        filters.keys.allocatedMinutes = vm.tableLayout.laborMinutes.searchText;
                    }

                    if (vm.tableLayout.materialCost.searchText) {
                        filters.keys.allocatedMaterialCost = vm.tableLayout.materialCost.searchText;
                    }

                    if (vm.tableLayout.priceOverrides.searchText) {
                        filters.keys.priceOverride = vm.tableLayout.priceOverrides.searchText;
                    }

                    if (vm.tableLayout.productId.searchText) {
                        filters.keys.id = vm.tableLayout.productId.searchText;
                    }

                    if (vm.tableLayout.payrollSpiff.searchText) {
                        filters.keys.payrollSpiff = vm.tableLayout.payrollSpiff.searchText;
                    }

                    if (vm.tableLayout.payrollMargin.searchText) {
                        filters.keys.payrollCommission = vm.tableLayout.payrollMargin.searchText;
                    }

                    if (vm.tableLayout.productMargin.searchText) {
                        filters.keys.miscellaneousMargin = vm.tableLayout.productMargin.searchText;
                    }

                    if (vm.tableLayout.productMarkup.searchText) {
                        filters.keys.miscellaneousMarkup = vm.tableLayout.productMarkup.searchText;
                    }

                    if (vm.tableLayout.productDescription.searchText) {
                        filters.keys.description = vm.tableLayout.productDescription.searchText;
                    }

                    filters.isEmpty = _.isEmpty(filters.keys);

                    return filters;
                };

                /*
                 * Product Filters/Tags
                 */
                vm.filters = ProductService.getActiveFilters();

                // reset the cached array of selectedFilterIds
                vm.resetSelectedFilterIdCache = function () {
                    vm.selectedFilterIdCache = null;
                };

                vm.chipSet = function (tag) {
                    var dataIndex = vm.getFilterDataIndex(tag);

                    if (dataIndex > -1) {
                        vm.filters.data.splice(dataIndex, 1);
                    } else {
                        vm.filters.data.push(tag);
                    }
                };

                vm.getFilterDataIndex = function (tag) {
                    var data = vm.filters.data,
                        dataIndex = -1,
                        idx, len;

                    for (idx = 0, len = data.length; idx < len; idx += 1) {
                        if (data[idx].id === tag.id) {
                            dataIndex = idx;
                            break;
                        }
                    }

                    return dataIndex;
                };

                vm.resetFilters = function (id) {
                    _.forEach(vm.filters.data, function (tag) {
                        vm.filters.remove(tag);
                    });

                    _.forEach(vm.tags['t' + id], function (type) {
                        _.forEach(type.tags, function (tag) {
                            tag.checked = false;
                        });
                    });

                    vm.filters.data = [];
                    vm.resetSelectedFilterIdCache();
                };

                vm.showSelectedFilters = function (tag) {
                    return tag.checked;
                };

                vm.tagLimit = {};

                vm.changeLimit = function (deptId, $index) {
                    var DEFAULT_LIMIT = 5;

                    vm.tagLimit[$index] = vm.tagLimit[$index] === DEFAULT_LIMIT || angular.isUndefined(vm.tagLimit[$index]) ?
                        vm.tags[deptId][$index].tags.length : DEFAULT_LIMIT;
                };

                vm.getSelectedFilterIds = function () {
                    var data = vm.filters.data,
                        idx, item,
                        len = data.length,
                        selectedFilterIds = [];

                    for (idx = 0, len = data.length; idx < len; idx += 1) {
                        item = data[idx];

                        if (item && item.id) {
                            selectedFilterIds.push(item.id);
                        }
                    }

                    vm.selectedFilterIdCache = selectedFilterIds;

                    return vm.selectedFilterIdCache;
                };

                vm.syncWithSelectedFilters = function (types) {
                    var selectedFilterIds = vm.selectedFilterIdCache || vm.getSelectedFilterIds();

                    return angular.forEach(types, function (type) {
                        return angular.forEach(type.tags, function (tag) {
                            if (selectedFilterIds.indexOf(tag.id) > -1) {
                                tag.checked = true;
                            }
                        });
                    });
                };

                vm.tags = {};
                vm.depts = [];

                ProductService.getAllTags().then(function (response) {
                    _.forEach(response.data.department, function (dept) {
                        vm.tags['t' + dept.id] = vm.syncWithSelectedFilters(dept.tag_types);
                        vm.depts.push({
                            id: dept.id,
                            name: dept.name
                        });
                    });
                });

                vm.selectDepartment = function (id) {
                    vm.resetFilters(id);
                    vm.update(id);
                };

                /*
                 * Perform Search
                 */
                vm.selectedDept = ProductService.getActiveDepartment();
                vm.promise = null;
                vm.update = function (key) {
                    var id = cleanDepartmentKey(key);

                    ProductService.setActiveDepartment(id);
                    vm.products = [];
                    vm.promise = ProductService.searchProduct(id).then(function (response) {
                        vm.products = _.map(response.data.service, function (product) {
                            return ProductModel(product);
                        });

                        vm.promise = null;
                    });
                };
                if (vm.selectedDept) {
                    vm.update(vm.selectedDept);
                }

                vm.tableData = function () {
                    if (vm.filters.data.length === 0) {
                        return vm.products;
                    }

                    return $filter('filter')(vm.products, function (product) {
                        return _.intersection(product.tags.map(function (tag) {
                            return tag.id;
                        }), vm.filters.data.map(function (tag) {
                            return tag.id;
                        })).length === vm.filters.data.length;
                    });
                };

                /*
                 * Product Quickview
                 */
                vm.showQuickView = false;

                vm.quickView = function (product) {
                    vm.product = product;
                    vm.product.imgSrc = '/images/product-placeholder.png';
                    vm.showQuickView = true;
                };

                vm.closeQuickView = function () {
                    vm.product = null;
                    vm.showQuickView = false;
                };
			}]);
})();