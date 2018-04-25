(function() {
	'use strict';

	/**
	 * @class worthClark.propertymanagement.PropertyManagementController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {PropertyManagementService} PropertyManagementService - @see PropertyManagementService
	 * @param {PropertyManagementModel} PropertyManagementModel - @see PropertyManagementModel
	 * @param {IState} $state - @see IState
	 * @param {LoDashStatic} _ - @see _
	 */
	angular
		.module('worthClark.propertymanagement')
		.controller('PropertyManagementController', [
			function() {
				const vm = this;

				vm.awesome = 'yes';
			}]);
})();
