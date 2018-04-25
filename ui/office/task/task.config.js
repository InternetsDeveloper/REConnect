(function() {
	'use strict';

	angular.module('worthClark.task')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.task', {
				url: '/task',
				redirectTo: 'worthClark.task.list'
			});

			$stateProvider.state('worthClark.task.create', {
				url: '/create',
				title: 'New Task',
				views: {
					'content@': {
						controller: 'TaskCreateController',
						controllerAs: 'task',
						templateUrl: 'html/task-create.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.task.list', {
				url: '/list/:pageNum',
				params: {
					pageNum: null
				},
				title: 'Search Tasks',
				views: {
					'content@': {
						controller: 'TaskController',
						controllerAs: 'taskList',
						templateUrl: 'html/task-list.tpl.html'
					}
				}
			});

			$stateProvider.state('worthClark.task.detail', {
				url: '/:id',
				title: 'Task Detail',
				views: {
					'content@': {
						controller: 'TaskDetailController',
						controllerAs: 'task',
						templateUrl: 'html/task-detail.tpl.html'
					}
				}
			});
		}]);
})();
