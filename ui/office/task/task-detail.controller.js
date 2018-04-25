(function() {
	'use strict';

	/**
	 * @class worthClark.task.TaskDetailController
	 *
	 * @param {Object} $mdToast Angular Material $mdToast service
	 * @param {IScope} $scope - Angular scope interface.
	 * @param {IStateParamsService} $stateParams - @see IStateParamsService
	 * @param {TaskService} TaskService - @see TaskService
	 * @param {TaskModel} TaskModel - @see TaskModel

	 * @param {IState} $state - @see IState
	 * @param {LoDashStatic} _ - @see _
	 * @param {FormIntegrity} FormIntegrity - @see FormIntegrity
	 */
	angular
		.module('worthClark.task')
		.controller('TaskDetailController', [
			function() {
				const vm = this;

				vm.awesome = 'yes';
			}]);
})();
