(function() {
	'use strict';

	angular
		.module('worthClark.note')
		.factory('NoteModel', [noteModel]);

	/**
	 * Represents a note.
	 * @class Note
	 * @property {Number} id
	 * @property {String} user
	 * @property {String} datetime
	 * @property {String} text
	 *
	 * @param {Object} note - The note data object.
	 * @param {Number} note.id - The note id.
	 * @param {String} note.user - The creator of the note.
	 * @param {String} note.created - The datetime the note was created.
	 * @param {String} note.description - The note text.
	 *
	 * @returns {Note} - The note object formatted for frontend use.
	 */
	var Note = function(note) {
		this.id = note.id;
		this.user = note.user;
		this.text = note.description;
		this.datetime = moment(note.created).format('MM/DD/YYYY hh:mm a');
	};

	function noteModel() {
		return function(note) {
			return new Note(note);
		};
	}
})();
