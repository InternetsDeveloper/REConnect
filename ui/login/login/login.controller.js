(function () {
    'use strict';

    angular
        .module('reConnect.login')
        .controller('LoginController', ['$state', 'loginService',
			function ($state, loginService) {
                const vm = this;

                vm.formData = {
                    username: null,
                    password: null
                };

                vm.userLogin = function () {
                    if (vm.formData.username === null || vm.formData.password === null) {
                        return;
                    }

                    loginService.authentication(vm.formData.username, vm.formData.password).then(function () {
                        loginService.createSession(vm.formData);
                        $state.go('reConnect.selector');
                    });
                };
			}]);
})();