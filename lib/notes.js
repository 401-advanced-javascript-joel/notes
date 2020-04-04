'use strict';
const mongoose = require('mongoose');
const NotesModel = require('../models/notes');

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
  constructor() {}
  
  /**
   * @method execute
   * Takes a command from the user and executes the command if it exists
   * @param {Command} command a command recieved from user.
   */
  async execute(command) {
    let result;
    switch (command.action) {
    case 'list':
      result = await this.list(command.payload.categories);
      break;
    case 'add':
      if (typeof command.payload.note === 'string') {
        result = await this.add(command.payload.note, command.payload.categories);
      } else {
        console.error('Invalid note given');
      }
      break;
    case 'update':
      if (typeof command.payload.note === 'string') {
        result = await this.update(command.payload.id, command.payload.note, command.payload.categories);   
      } else {
        console.error('Invalid note given');
      }
      break;
    case 'delete':
      result = await this.delete(command.payload.id);
      break;
    default:
      result = console.error('Invalid command. See --help');
      break; 
    }
    mongoose.disconnect();
    return result;
  }

  /**
   * @method list
   * gets the list of note object from the db
   * @param {String} categories string of categories for to select from the db
   */
  async list(categories) {
    try {
      const notes = await NotesModel.find({});
      let filtered;
      if (typeof categories === 'string') {
        //if categories supplied and correctly typed, filter out unmatching notes
        categories = categories.split(', ');
        filtered = notes.filter((note) => {
          let wanted = false;
          if (note.categories) {
            note.categories.forEach((category) => {
              if (categories.includes(category)) {
                wanted = true;
              }            
            });
          }          
          return wanted;
        });
      } else {
        filtered = notes;
      }
      if (filtered) {
        filtered.forEach(note => {
          console.log('ID:', note._id, 'Note:', `[${note.categories ? note.categories : ''}]`, note.note);
        });
      }
      return filtered;
    } catch (e) {
      console.error(e);
    }
  }


  /**
   * @method add
   * Adds a new note object to db 
   * @param {String} note the text new note.
   * @param {String} categories string of categories for the new note
   */
  async add(note, categories) {
    try {
      if (typeof categories === 'string') {
        categories = categories.split(', ');
      }
      const newNote = await NotesModel.create({note, categories});
      console.log(`Note ${newNote.id} Successfully Added!`);
      return newNote;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @method update
   * Updates a note object in the library 
   * @param {String} note_id the id of the note to update.
   * @param {String} note the new text for the note note.
   * @param {String} categories the new string of categories for the note
   */
  async update(note_id, note, categories) {
    try {
      if (typeof categories === 'string') {
        categories = categories.split(', ');
      }
      const updated = await NotesModel.findByIdAndUpdate(note_id,{note, categories},{new: true});
      if (updated) {
        console.log(`Note ${note_id} Successfully Updated!`);
      } else {
        console.error('No note found with that ID.');
      }
      return updated;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * @method delete
   * Deletes a note object from the library 
   * @param {String} note_id the id of the note to be removed.
   */
  async delete(note_id) {
    try {
      const deleted = await NotesModel.findByIdAndDelete(note_id);
      if (deleted) {
        console.log(`Note ${note_id} Successfully Deleted!`);
      } else {
        console.error('No notes found with that ID.');
      }
      return deleted;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Notes;
