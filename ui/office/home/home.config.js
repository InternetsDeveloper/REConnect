(function () {
    'use strict';

    angular.module('reConnect.home')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.home', {
                url: '/home',
                redirectTo: 'reConnect.home.find'
            });

            $stateProvider.state('reConnect.home.sell', {
                url: '/sell',
                title: 'Sell A Home',
                views: {
                    'content@': {
                        controller: 'HomeSellController',
                        controllerAs: 'homeSell',
                        templateUrl: 'html/home-sell.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.home.find', {
                url: '/find/:pageNum',
                params: {
                    pageNum: null
                },
                title: 'Find A Home',
                views: {
                    'content@': {
                        controller: 'HomeFindController',
                        controllerAs: 'homeFind',
                        templateUrl: 'html/home-find.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.home.detail', {
                url: '/:id',
                title: 'Home Details',
                views: {
                    'content@': {
                        controller: 'HomeDetailController',
                        controllerAs: 'home',
                        templateUrl: 'html/home-detail.tpl.html'
                    }
                }
            });
		}]);
})();
