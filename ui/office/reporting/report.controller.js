(function() {
	'use strict';

	/**
	 * @class worthClark.report.ReportController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {ReportService} ReportService - @see ReportService
	 * @param {ReportModel} ReportModel - @see ReportModel
	 * @param {IState} $state - @see IState
	 * @param {LoDashStatic} _ - @see _
	 */
	angular
		.module('worthClark.report')
		.controller('ReportController', [
			function() {
				const vm = this;

				vm.awesome = 'yes';
			}]);
})();
