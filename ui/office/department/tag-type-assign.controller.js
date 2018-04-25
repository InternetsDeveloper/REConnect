(function() {
	'use strict';

	/**
	 * @class worthClark.department.TagTypeAssignController
	 * @memberOf worthClark.department
	 *
	 * @param {ISidenavService} $mdSidenav - @see ISidenavService
	 * @param {DepartmentService} DepartmentService - @see DepartmentService
	 * @param {TagService} TagService - @see TagService
	 * @param {FormIntegrity} FormIntegrity - @see FormIntegrity
	 */
	angular
		.module('worthClark.department')
			.controller('TagTypeAssignController', ['$mdSidenav', 'DepartmentService', 'TagService', 'FormIntegrity',
				function($mdSidenav, DepartmentService, TagService, FormIntegrity) {
					var vm = this;

					/*
					 * Table Config
					 */
					vm.tableConfig = {
						order: '',
						limit: 15,
						page: 1
					};

					vm.formIntegrity = FormIntegrity;

					vm.options = {
						rowSelection: true,
						multiSelect: true,
						autoSelect: true,
						decapitate: false,
						largeEditDialog: false,
						boundaryLinks: false,
						limitSelect: true,
						pageSelect: true
					};

					/*
					 * Department Data
					 */
					vm.promise = DepartmentService.getAll().then(function(response) {
						vm.departments = response.data.department;
					});

					/*
					 * Tag Data
					 */
					vm.tagTypes = null;

					TagService.getAllTypes().then(function(response) {
						vm.tagTypes = response.data.tag_type;
					});

					/*
					 * Side Bar
					 */
					vm.toggleEdit = function() {
						$mdSidenav('edit').toggle();
					};

					/*
					 * Editing
					 */
					vm.editing = {
						product: null,
						selected: []
					};

					vm.isAssigned = function(index, tagType) {
						vm.editing.selected[index] = vm.editing.product.tag_types.map(function(type) {
							return type.id;
						}).indexOf(tagType.id) > -1;
					};

					vm.typeAssign = function(doAdd, tagType) {
						if(doAdd) {
							vm.editing.product.tag_types.push(tagType);
						} else {
							var index = vm.editing.product.tag_types.map(function(type) {
								return type.id;
							}).indexOf(tagType.id);

							vm.editing.product.tag_types.splice(index, 1);
						}
					};

					vm.hasTypeAssigned = function(id) {
						if(angular.isUndefined(id)) {
							return false;
						}

						return vm.editing.product.tag_types.map(function(tagType) {
							return tagType.id;
						}).indexOf(id) > -1;
					};

					vm.edit = function(id) {
						vm.editing = {
							product: null,
							selected: []
						};

						DepartmentService.fetch(id).then(function(response) {
							vm.editing.product = response.data;
						});

						vm.toggleEdit();
					};

					vm.save = function() {
						DepartmentService.updateTagTypes(vm.editing.product.id, vm.editing.product.tag_types.map(function(type) {
							return type.id;
						})).then(function(response) {
							for(var idx = 0; idx < vm.departments.length; idx++) {
								if(vm.departments[idx].id === response.data.id) {
									vm.departments[idx] = response.data;
								}
							}

							vm.formIntegrity.setPristine();

							vm.toggleEdit();
						});
					};

					vm.preventAccordion = function(evt) {
						evt.stopPropagation();
					};
				}]);
})();
