'use strict';
const notesModel = require('../models/models');

/**
 * Notes Module
 * @module notes
 */

/**
 * This class creates a notes object for interacting
 * @class Notes
 */
class Notes {

  /**
   * @constructor
   * @param {Model} model the wrapper for 
   */
  constructor(model) {
    this.model = notesModel;
  }
  
  /**
   * @method execute
   * Takes a command from the user and executes the command if it exists
   * @param {Command} command a command recieved from user.
   */
  async execute(command) {
    let result;
    let note = {};
    switch (command.action) {
    case 'list':
      if (typeof command.payload.category === 'string') {
        // only get notes with matching categories
        note.categories = { '$in' : [command.payload.category] };
      }
      result = await this.model.read(note);
      break;
    case 'add':
      if (typeof command.payload.note === 'string') {
        note.note = command.payload.note;
        if (command.payload.categories) {
          note.categories = command.payload.categories;
        }
        result = await this.model.create(note);
      } else {
        console.error('Invalid note given');      
      }
      break;
    case 'update':
      if (typeof command.payload.note === 'string') {
        let id = command.payload.id;
        note.note = command.payload.note;
        if (command.payload.categories) {
          note.categories = command.payload.categories;
        }
        result = await this.model.update(id, note);   
      } else {
        console.error('Invalid note given');
      }
      break;
    case 'delete':
      result = await this.model.delete(command.payload.id);
      break;
    default:
      console.error('Invalid command. See --help');
      break; 
    }
    return result;
  }
}

module.exports = Notes;
