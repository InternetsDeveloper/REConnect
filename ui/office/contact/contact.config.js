(function() {
	'use strict';

	angular.module('worthClark.contact')
		.config(['$stateProvider', function($stateProvider) {
			$stateProvider.state('worthClark.contact', {
				url: '/contact',
				redirectTo: 'worthClark.contact.list'
			});

			$stateProvider.state('worthClark.contact.create', {
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

			$stateProvider.state('worthClark.contact.list', {
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

			$stateProvider.state('worthClark.contact.detail', {
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

			$stateProvider.state('worthClark.contact.import', {
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
