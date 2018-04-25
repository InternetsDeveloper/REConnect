(function() {
	'use strict';

	/**
	 * @class worthClark.marketing.MarketingController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {MarketingService} MarketingService - @see MarketingService
	 * @param {MarketingModel} MarketingModel - @see MarketingModel
	 * @param {IState} $state - @see IState
	 * @param {LoDashStatic} _ - @see _
	 */
	angular
		.module('worthClark.marketing')
		.controller('MarketingController', [
			function() {
				const vm = this;

				vm.awesome = 'yes';
			}]);
})();
