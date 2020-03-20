#!/usr/bin/env node
'use strict';

/**
 * A simple node.js application with a notes command
 * @module index
 */

// Requires the library files you will be writing (input, notes)
const Input = require('./lib/input');
const Notes = require('./lib/notes');

// Create our initial notes object
let notes = new Notes();

// Instantiates an “Input” parser
let input = new Input();

if (input.valid()) {
  switch (input.command.action) {
  case 'add': 
    // Sends properly parsed input to the Notes library for display
    if (notes.execute(input.command)) {
      console.log('Successfully Added');
    } else {
      throw new Error('Supplied note text invalid.');
    }
    break;
  default: 
    throw new Error('Supplied action is unknown.');
  }
} else {
  throw new Error('Improper command format. See --help');
}
