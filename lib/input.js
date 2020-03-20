'use strict';

const Validator = require('./validator');

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
    this.validator = new Validator({ action: { type: 'string', required: true }}); // validates a command object
    let formatted = yargs.command({
      command: ['add','a'],
      describe: 'Adds a note to the notes library.',
      builder: {
        note: {
          describe: 'A text note to be added to the library.',
          type: 'string',
        },
      },
    }).argv;
    if (formatted.add || formatted.a) {
      this.command = { action: 'add', payload: formatted.add || formatted.a };
    } else {
      this.command = {};
    }
  }

  /**
   * @method valid
   * Checks to make sure the input from the user is a valid one
   * @return {Boolean} if input is a valid command or not
   */
  valid() {
    return this.validator.validate(this.command);
  }
  
}

module.exports = Input;
