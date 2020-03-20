'use strict';
/**
 * Notes Module
 * @module notes
 */

/**
 * Represents a notes database.
 * @class
 */
class Notes {

  /**
   * @constructor
   */
  constructor() {
    // This array is acting as my temporary db
    this.db = [];
  }
  
  /**
   * @method
   * Takes a command from the user and executes the command if it exists
   * @param command a command recieved from user.
   */
  execute(command) {
    switch (command.action) {
    case 'add':
      return this.add(command.payload);
    default:
      return; 
    }
  }

  /**
   * @method
   * Creates a new note object and then adds that new note object to db 
   * @param note_text the text to be used to create the note object.
   */
  add(note_text) {
    let id = Math.ceil(Math.random() * 999);
    let note = { id, note_text };
    this.db.push(note);
    console.log(note);
  }

}

module.exports = Notes;
