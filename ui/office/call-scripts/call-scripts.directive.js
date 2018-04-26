(function () {
    'use strict';

    /**
     * @memberOf reConnect.callScripts
     *
     * @param {IRootScopeService} $rootScope - Angular $rootScope service.
     * @param {CallScriptsService} CallScriptsService - @see CallScriptsService.
     * @param {lodash} _ - @see _.
     *
     * @returns {IDirective} - Returns the call scripts element directive.
     */
    angular
        .module('reConnect.callScripts')
        .directive('callScripts', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'html/call-scripts.tpl.html',
                scope: true,
                link: function (scope) {
                    scope.expanded = $rootScope.app.showCallScripts;

                    // CallScriptsService.getAllScripts().then(function(response) {
                    // 	scope.callScripts = {};
                    //
                    // 	_.forEach(response.data.script, function(script) {
                    // 		if(angular.isUndefined(scope.callScripts[script.type.name])) {
                    // 			scope.callScripts[script.type.name] = [];
                    // 		}
                    //
                    // 		scope.callScripts[script.type.name].push(script);
                    // 	});
                    // });
                    //
                    // scope.setScriptText = function(script) {
                    // 	scope.selected = script.name;
                    // 	scope.scriptText = script.text;
                    // };
                    //
                    // scope.clearScriptText = function() {
                    // 	scope.selected = null;
                    // 	scope.scriptText = null;
                    // };
                    //
                    // scope.$watch(function() {
                    // 	return $rootScope.app.showCallScripts;
                    // }, function() {
                    // 	scope.expanded = $rootScope.app.showCallScripts;
                    // });
                }
            };
		}]);
})();
