(function () {
    'use strict';

    angular.module('reConnect.task')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.task', {
                url: '/task',
                redirectTo: 'reConnect.task.list'
            });

            $stateProvider.state('reConnect.task.create', {
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

            $stateProvider.state('reConnect.task.list', {
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

            $stateProvider.state('reConnect.task.detail', {
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
