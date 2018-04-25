(function() {
	'use strict';

	angular
		.module('worthClark.dispatch')
		.factory('PollingService', ['$timeout', 'Constants', '$log', '$mdToast', function($timeout, Constants, $log, $mdToast) {
			function Polling(serviceToPoll, name) {
				this.name = name;
				this.service = serviceToPoll;
				this.debug = false;
			}

			function log(mode, value) {
				if(this.debug) {
					$log[mode](value);
				}
			}

			function delayedStart() {
				this.delayTimer = $timeout(this.startPolling, Constants.SERVICE_POLLING_INTERVAL, true, this);
			}

			function skipPolling() {
				this.stopPolling();
				this.refreshTimer = $timeout(this.startPolling, Constants.SERVICE_POLLING_INTERVAL, true, this);
			}

			function startPolling(scope) {
				var self = scope || this;

				if(self.delayTimer) {
					self.log('info',
						'Stopping delayTimer for ' + self.name +
						', delayTimer, ' + self.delayTimer +
						', cancelled = ' + $timeout.cancel(self.delayTimer));

					self.delayTimer = null;
				}

				if(self.refreshTimer) {
					self.log('warn', 'RefreshTimer already started!');

					return false;
				}

				return self.poll();
			}

			function stopPolling() {
				if(this.delayTimer) {
					this.log('info',
						'Stopping delayTimer for ' + this.name +
						', delayTimer, ' + this.delayTimer +
						', cancelled = ' + $timeout.cancel(this.delayTimer));
					this.delayTimer = null;
				}

				this.log('info',
					'Stopping refreshTimer for ' + this.name +
					', refreshTimer, ' + this.refreshTimer +
					', cancelled = ' + $timeout.cancel(this.refreshTimer));
			}

			function resetPolling() {
				this.stopPolling();

				return this.startPolling();
			}

			function poll(scope) {
				var DELAY = 3000,
					self = scope || this;

				self.log('info', 'Refreshing ' + self.name);

				return self.service.apply(self).then(function(response) {
					self.refreshTimer = $timeout(self.poll, Constants.SERVICE_POLLING_INTERVAL, true, self);

					return response;
				}, function(error) {
					self.resetPolling();

					$mdToast.show(
								$mdToast.simple()
									.textContent('Auto refresh failed. Restarting...')
									.hideDelay(DELAY)
							);

					return error;
				});
			}

			Polling.prototype.delayedStart = delayedStart;
			Polling.prototype.skipPolling = skipPolling;
			Polling.prototype.startPolling = startPolling;
			Polling.prototype.stopPolling = stopPolling;
			Polling.prototype.resetPolling = resetPolling;
			Polling.prototype.poll = poll;
			Polling.prototype.log = log;

			return {
				get: function(service, name) {
					return new Polling(service, name);
				}
			};
		}]);
})();

/*
(function() {
	'use strict';

	angular
		.module('worthClark.dispatch')
		.factory('PollingService', ['$timeout', 'Constants', '$log', function($timeout, Constants, $log) {
			return function(serviceToPoll, serviceName) {
				var debug = true,
					log = function(mode, value) {
						if(debug) {
							$log[mode](value);
						}
					},
					name = serviceName,
					service = serviceToPoll;

				return {
					delayedStart: delayedStart,
					skipPolling: skipPolling,
					startPolling: startPolling,
					stopPolling: stopPolling,
					resetPolling: resetPolling,
					poll: poll
				};

				function delayedStart() {
					$timeout(this.startPolling, Constants.SERVICE_POLLING_INTERVAL, true, this);
				}

				function skipPolling() {
					this.stopPolling();
					$timeout(this.startPolling, Constants.SERVICE_POLLING_INTERVAL, true, this);
				}

				function startPolling(scope) {
					var self = scope || this;

					if(self.refreshTimer) {
						log('warn', 'RefreshTimer already started!');

						return false;
					}

					self.refreshTimer = self.poll();

					return self.refreshTimer;
				}

				function stopPolling() {
					$timeout.cancel(this.refreshTimer);
					log('info', 'Stopping refreshTimer for ' + name + ', refreshTimer = ' + this.refreshTimer);
				}

				function resetPolling() {
					this.stopPolling();

					return this.startPolling();
				}

				function poll(scope) {
					var self = scope || this;

					log('info', 'refreshing ' + name);

					return service.apply(self).then(function(response) {
						return $timeout(self.poll, Constants.SERVICE_POLLING_INTERVAL, true, self);

						return response;
					}, function(error) {
						self.resetPolling();

						return error;
					});
				}
			};
		}]);
})();*/
