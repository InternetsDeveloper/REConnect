(function() {
	'use strict';
	angular
		.module('worthClark.dispatch')
		.controller('InfoController', [function() {
			var vm = this;

			vm.formatAddress = function(address) {
				return encodeURIComponent(address);
			};

			vm.formatDate = function(date) {
				var mDate = date;

				if(!moment.isMoment(mDate)) {
					mDate = moment(mDate, 'YYYY-MM-DD');
				}

				return mDate.format('ddd, MMM Mo');
			};
		}]);
})();
