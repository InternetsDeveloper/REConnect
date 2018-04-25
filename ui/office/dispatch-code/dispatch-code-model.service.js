(function() {
	'use strict';

	angular
		.module('worthClark.dispatchCode')
		.factory('DispatchCodeModel', [dispatchCodeModel]);

	/**
	 * Represents an dispatchCode.
	 * @constructor {Object} DispatchCode
	 *
	 * @property {Number} id
	 * @property {String} name
	 * @property {String} department
	 *
	 * @param {Object} dispatchCode - The dispatchCode data object.
	 * @param {Number} dispatchCode.id - The dispatchCode's identification number.
	 * @param {String} dispatchCode.name - The dispatchCode's name.
	 * @param {String} dispatchCode.department - The dispatchCode's department.
	 */
	function DispatchCode(dispatchCode) {
		this.id = dispatchCode.id;
		this.name = dispatchCode.name;
		this.department = dispatchCode.department;
	}

	/**
	 * @function dispatchCodeModel
	 *
	 * @return {Function} - Returns a new function to be called to be called to create a new dispatchCode object.
	 */
	function dispatchCodeModel() {
		/**
		 * Returns an instance of the DispatchCode class
		 *
		 * @typedef {Object} DispatchCode
		 *
		 * @param {Object} dispatchCode - The dispatchCode data object.
		 *
		 * @returns {Object} DispatchCode instance - Instantiates the dispatchCode object.
		 */
		return function(dispatchCode) {
			return new DispatchCode(dispatchCode);
		};
	}
})();
