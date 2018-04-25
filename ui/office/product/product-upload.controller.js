(function() {
	'use strict';

	/**
	 * @class worthClark.product.ProductUploadController
	 *
	 * @param {$mdToast} $mdToast - Angular material toast service.
	 * @param {ProductService} ProductService - @see ProductService
	 */
	angular
		.module('worthClark.product')
		.controller('ProductUploadController', ['$mdToast', 'ProductService', function($mdToast, ProductService) {
			var DELAY_TOAST = 3000,
				input = angular.element('#product-csv'),
				toast = $mdToast
					.simple()
					.textContent('Upload Successful!')
					.action('CLOSE')
					.highlightAction(true)
					.highlightClass('md-warn')
					.position('bottom right')
					.hideDelay(DELAY_TOAST),
				vm = this;

			vm.focusFileInput = function() {
				input.click();
			};

			input.on('change', function(evt) {
				var files = evt.target.files;

				if(files[0]) {
					vm.fileName = files[0].name;
				} else {
					vm.fileName = null;
				}

				vm.showProgress = true;

				ProductService.uploadCSV(files[0]).then(function() {
					vm.showProgress = false;

					$mdToast.show(toast);
				}, function(response) {
					vm.showProgress = false;

					if(response.status > 0) {
						vm.errorMsg = response.status + ': ' + response.data;
					}
				}, function(event) {
					var PERCENTAGE_DECIMAL = 100;

					vm.progress = Math.min(PERCENTAGE_DECIMAL, parseInt(PERCENTAGE_DECIMAL * event.loaded / event.total, 10));
				});
			});
		}]);
})();
