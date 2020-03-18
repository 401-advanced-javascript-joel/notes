'use strict';
/**
 * Notes Module
 * @module notes
 */

/**
 * Represents a notes database.
 * @constructor
 */
function Notes() {
  // This array is acting as my temporary db
  this.db = [];
}

/**
 * @param command a command recieved from user.
 */
Notes.prototype.execute = function (command) {
  switch (command.action) {
  case 'add':
    return this.add(command.payload);
  default:
    return; 
  }
};

/**
 * @param note_text the text to be used to create and add a new note.
 */
Notes.prototype.add = function (note_text) {
  let id = Math.ceil(Math.random() * 999);
  let note = { id, note_text };
  this.db.push(note);
  console.log(note);
};

module.exports = Notes;
