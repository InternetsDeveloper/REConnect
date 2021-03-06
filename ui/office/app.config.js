(function () {
    'use strict';

    angular.module('reConnect').config(['$compileProvider', '$mdThemingProvider', function ($compileProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('blue-grey');
	}])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false,
                    rewriteLinks: false
                });


                $urlRouterProvider.otherwise('/404');

                $stateProvider
                    .state('reConnect', {
                        abstract: true
                    })
                    .state('reConnect.dashboard', {
                        url: '/dashboard',
                        title: 'Dashboard',
                        views: {
                            'content@': {
                                templateUrl: 'html/dashboard.tpl.html'
                            }
                        }
                    })
                    .state('reConnect.404', {
                        url: '/404',
                        views: {
                            'content@': {
                                templateUrl: 'html/404.tpl.html'
                            }
                        }
                    });
		}])
        .constant('_', _)
        .run(['$rootScope', '$document', '$state', '$window', '$mdSidenav', 'loginService',
		function ($rootScope, $document, $state, $window, $mdSidenav, loginService) {
                function isSet(value) {
                    return angular.isDefined(value) && value !== null;
                }

                function isFullscreen() {
                    return isSet($document[0].fullscreenElement) || isSet($document[0].webkitFullscreenElement) ||
                        isSet($document[0].mozFullscreenElement) || isSet($document[0].msFullscreenElement);
                }

                function checkSession() {
                    var validSession = loginService.checkSession();

                    $rootScope.app.session = validSession;

                    if (!validSession) {
                        $window.location = '/';
                    }
                }

                $rootScope.app = {
                    name: 'reConnect',
                    year: moment().format('YYYY'),
                    leftNavOpen: true,
                    toggleLeftNav: function () {
                        $mdSidenav('left-navigation').toggle();
                    },
                    state: $state,
                    session: loginService.checkSession(),
                    leftNav: [
                        {
                            text: 'Dashboard',
                            sref: 'reConnect.dashboard',
                            icon: 'tachometer'
					},
                        {
                            text: 'Contacts',
                            sref: 'reConnect.contact',
                            icon: 'users'
					},
                        {
                            text: 'Tasks',
                            sref: 'reConnect.task',
                            icon: 'tasks'
					},
                        {
                            text: 'Marketing Center',
                            sref: 'reConnect.marketing',
                            icon: 'random'
					},
                        {
                            text: 'Reporting',
                            sref: 'reConnect.report',
                            icon: 'bar-chart'
					},
                        {
                            text: 'Find A Home',
                            sref: 'reConnect.home.find',
                            icon: 'home'
					},
                        {
                            text: 'Sell A Home',
                            sref: 'reConnect.home.sell',
                            icon: 'map-signs'
					},
                        {
                            text: 'Manage Property',
                            sref: 'reConnect.propertymanagement',
                            icon: 'building-o'
					}
				],
                    getTitle: function () {
                        return $state.current.title;
                    },
                    toggleFullScreen: function () {
                        var element = $document[0].documentElement;

                        if (isFullscreen()) {
                            if ($document[0].exitFullscreen) {
                                $document[0].exitFullscreen();
                            } else if ($document[0].mozCancelFullScreen) {
                                $document[0].mozCancelFullScreen();
                            } else if ($document[0].webkitExitFullscreen) {
                                $document[0].webkitExitFullscreen();
                            }

                            return;
                        }

                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen();
                        } else if (element.webkitRequestFullscreen) {
                            element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen();
                        }
                    },
                    isFullscreen: isFullscreen,
                    showCallScripts: false,
                    // toggleCallScripts: function() {
                    // 	//$rootScope.app.showCallScripts = !$rootScope.app.showCallScripts;
                    //
                    // 	if($rootScope.app.showCallScripts) {
                    // 		$state.go('reConnect.customer.list');
                    // 	}
                    // },
                    goToAdmin: function () {
                        $window.location = '/admin';
                    }
                };

                $rootScope.$on('sessionChange', checkSession); // eslint-disable-line angular/on-watch


                checkSession();


                $rootScope.app.debugInfoEnabled = false;
		}]);

    angular.bootstrap(document, ['reConnect'], {
        strictDi: true
    });
})();
