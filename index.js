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
    notes.execute(input.command);
    break;
  default: 
    break;
  }
} else {
  console.error('Invalid command. See --help');
}
