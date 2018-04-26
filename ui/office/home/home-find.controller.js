(function () {
    'use strict';

    /**
     * @class reConnect.home.HomeFindController
     *
     * @param {Object} $mdToast Angular Material $mdToast service
     * @param {IScope} $scope - Angular scope interface.
     * @param {IStateParamsService} $stateParams - @see IStateParamsService
     * @param {HomeService} HomeService - @see HomeService
     * @param {HomeModel} HomeModel - @see HomeModel

     * @param {IState} $state - @see IState
     * @param {LoDashStatic} _ - @see _
     */
    angular
        .module('reConnect.home')
        .controller('HomeFindController', [
			function () {
                const vm = this;

                vm.awesome = 'yes';
			}]);
})();
