'use strict';
/**
 * Input Module
 * @module input
 */
const yargs = require('yargs');

/**
 * Represents an input from the user.
 * @constructor
 */
function Input() {
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
 * Checks to make sure the input from the user is a valid one
 * @return {Boolean} if input is a valid command or not
 */
Input.prototype.valid = function() {
  if (!this.command) return false;
  if (!this.command.action) return false;
  switch (this.command.action) {
  case 'add': 
    return typeof this.command.payload === 'string';
  default: 
    break;
  }
  return false;
};

module.exports = Input;
