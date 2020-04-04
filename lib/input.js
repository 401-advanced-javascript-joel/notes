'use strict';


/**
 * Input Module
 * @module input
 */
const yargs = require('yargs');

/**
 * Represents an input from the user.
 * @class Input
 */
class Input {
  constructor() {
    // create options
    let categoriesOpt = {
      'categories': {
        alias: 'c',
        describe: 'Specifies one or more categories.',
        type: 'String',
      },
    };
    let notesOpt = {
      'note': {
        alias: 'n',
        describe: 'The note to be saved',
        type: 'String',
      },
    };

    // create commands
    let listCmd = {
      command: ['list','l'],
      describe: 'List the notes from the library.',
    };
    let addCmd = {
      command:['add', 'a'],
      describe: 'Adds a note to the notes library.', 
      builder: categoriesOpt,
    };    
    let updateCmd = {
      command: ['update','u'],
      describe: 'deletes the specified note from the library.',
      builder: notesOpt, categoriesOpt,
    };
    let deleteCmd = {
      command: ['delete','d'],
      describe: 'deletes the specified note from the library.',
    };
    


    let formatted = yargs
      .command(listCmd)
      .command(addCmd)
      .command(updateCmd)
      .command(deleteCmd).argv;

    if (formatted.list || formatted.l) {
      this.command = { 
        action: 'list', 
        payload: { 
          category: formatted.list || formatted.l,
        },
      };
    } else if (formatted.add || formatted.a) {
      this.command = { 
        action: 'add', 
        payload: { 
          note: formatted.add || formatted.a,
          categories: formatted.categories || formatted.c,
        },
      };
    } else if (formatted.update || formatted.u) {
      this.command = { 
        action: 'update', 
        payload: { 
          id: formatted.update || formatted.u,
          note: formatted.note || formatted.n,
          categories: formatted.categories || formatted.c,
        },
      };
    } else if (formatted.delete || formatted.d) {
      this.command = { 
        action: 'delete', 
        payload: { 
          id: formatted.delete || formatted.d,
        },
      };
    } else {
      this.command = {};
    }

    // fix since boolean gets cast to string and passes validation
    if (this.command.payload) {
      if (this.command.payload.categories === true) {
        this.command.payload.categories = undefined;
      } else if (typeof this.command.payload.categories === 'string') {
        // split categories into array
        this.command.payload.categories = this.command.payload.categories.split(', ');
      }
    }
  }
}

module.exports = Input;
