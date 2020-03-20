'use strict';

const Validator = require('./validator');


/**
 * Notes Module
 * @module notes
 */

/**
 * Represents a notes database.
 * @class Notes
 */
class Notes {

  /**
   * @constructor
   */
  constructor() {
    this.validator = new Validator({ //validates a note object
      id: { type: 'number', required: true },
      note_text: { type: 'string', required: true },
    });
    // This array is acting as my temporary db
    this.db = [];
  }
  
  /**
   * @method execute
   * Takes a command from the user and executes the command if it exists
   * @param {Command} command a command recieved from user.
   * @return {Boolean} if command was executed;
   */
  execute(command) {
    switch (command.action) {
    case 'add':
      return this.add(command.payload);
    default:
      return false; 
    }
  }

  /**
   * @method add
   * Creates a new note object and then adds that new note object to db 
   * @param {String} note_text the text to be used to create the note object.
   * @return {Boolean} if it was able to add the new note or not.
   */
  add(note_text) {
    let id = Math.ceil(Math.random() * 999);
    let note = { id, note_text };
    let valid = this.validator.validate(note);
    if (valid) {
      this.db.push(note);
      console.log(note);
    } 
    return valid;
  }

}

module.exports = Notes;
