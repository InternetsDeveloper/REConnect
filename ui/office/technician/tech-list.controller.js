(function() {
	'use strict';

	angular
		.module('worthClark.technician')
		.controller('TechController', ['$stateParams', '$mdToast', 'TechnicianService', '$state',
			function($stateParams, $mdToast, TechnicianService, $state) {
				var delay = 3000,
					vm = this;


				vm.tableConfig = {
					order: '',
					limit: 15,
					page: 1,
					button: {
						show: true,
						ctrl: {
							action: function(technician) {
								$state.go('worthClark.technician.edit', {
									id: technician.id
								}, {
									notify: true
								});
							},
							ariaLabelFn: function(technician) {
								return ['Open technician detail for ', technician.firstName, ' ', technician.lastName].join('');
							}
						},
						template: '<md-button \
							aria-label="ariaLabelFn(item)" \
							ng-click="action(item)" \
							class="md-primary">View \
							</md-button>'
					},
					createTechnician: function() {
						$state.go('worthClark.technician.create', {}, {
							notify: true
						});
					}
				};

				vm.tableLayout = {
					firstName: {
						label: 'First Name',
						key: 'first_name',
						show: true,
						searchText: ''
					},
					lastName: {
						label: 'Last Name',
						key: 'last_name',
						show: true,
						searchText: ''
					}
				};

				if($stateParams.message) {
					$mdToast.show(
						$mdToast.simple()
							.textContent('Technician successfully added')
							.hideDelay(delay)
					);
				}

				vm.tableFilter = function() {
					var filters = {
						keys: {},
						isEmpty: true
					};

					if(vm.tableLayout.firstName.searchText) {
						filters.keys.first_name = vm.tableLayout.firstName.searchText;
					}

					if(vm.tableLayout.lastName.searchText) {
						filters.keys.last_name = vm.tableLayout.lastName.searchText;
					}

					filters.isEmpty = _.isEmpty(filters.keys);

					return filters;
				};

				vm.stopSort = function(evt) {
					evt.stopPropagation();
				};

				vm.promise = TechnicianService.getAll().then(function(result) {
					vm.technicians = result.data.technician;
				});
				vm.tableData = function() {
					return vm.technicians;
				};
			}]);
})();
