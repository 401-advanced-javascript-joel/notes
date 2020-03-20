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
    this.note = {};
  }
  
  /**
   * @method execute
   * Takes a command from the user and executes the command if it exists
   * @param {Command} command a command recieved from user.
   */
  execute(command) {
    switch (command.action) {
    case 'add':
      this.add(command.payload);
      break;
    default:
      break; 
    }
  }

  /**
   * @method add
   * Creates a new note object and then adds that new note object to db 
   * @param {String} note_text the text to be used to create the note object.
   */
  add(note_text) {
    let id = Math.ceil(Math.random() * 999);
    this.note = { id, note_text };
    if (this.valid()) {
      this.db.push(this.note);
      console.log(this.note);
    } else {
      console.error('Invalid note');
    }
  }

  /**
   * @method valid
   * Checks to make sure the note the text entered by the user is valid
   * @return {Boolean} if input is a valid command or not
   */
  valid() {
    return this.validator.validate(this.note); 
  }

}

module.exports = Notes;
