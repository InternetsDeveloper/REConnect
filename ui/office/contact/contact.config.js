(function () {
    'use strict';

    angular.module('reConnect.contact')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('reConnect.contact', {
                url: '/contact',
                redirectTo: 'reConnect.contact.list'
            });

            $stateProvider.state('reConnect.contact.create', {
                url: '/contact',
                title: 'New Contact',
                views: {
                    'content@': {
                        controller: 'ContactCreateController',
                        controllerAs: 'contact',
                        templateUrl: 'html/contact-detail.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.contact.list', {
                url: '/list/:pageNum',
                params: {
                    pageNum: null
                },
                title: 'Search Contacts',
                views: {
                    'content@': {
                        controller: 'ContactController',
                        controllerAs: 'contactList',
                        templateUrl: 'html/contact-list.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.contact.detail', {
                url: '/:id',
                title: 'Contact Details',
                views: {
                    'content@': {
                        controller: 'ContactDetailController',
                        controllerAs: 'contact',
                        templateUrl: 'html/contact-detail.tpl.html'
                    }
                }
            });

            $stateProvider.state('reConnect.contact.import', {
                url: '/import',
                title: 'Import Contacts',
                views: {
                    'content@': {
                        controller: 'ContactImportController',
                        controllerAs: 'contactImporter',
                        templateUrl: 'html/contact-import.tpl.html'
                    }
                }
            });
		}]);
})();
