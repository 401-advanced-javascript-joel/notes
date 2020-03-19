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
    command: 'notes',
    describe: 'Adds a note to the notes library',
    builder: {
      add: {
        alias: ['a', 'add'],
        describe: 'Note Text',
        type: 'string',
      },
    },
  }).argv;

  if (formatted._ === 'notes') {
    if (formatted.add) {
      this.command = { action: 'add', payload: formatted.add };
    } else {
      this.command = {};
    }
  }
}

/**
 * Checks to make sure the input from the user is a valid one
 * @return {Boolean} if input is a valid command or not
 */
Input.prototype.valid = function() {
  if (!this.command) return false;
  if (!this.command.action) return false;
  return true;
};

module.exports = Input;
