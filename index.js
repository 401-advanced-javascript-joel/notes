'use strict';
/**
 * Simple Notes App
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
  // Sends properly parsed input to the Notes library for display
  notes.add(input.command.payload);
} else {
  console.error('Error: Invalid Input.');
}
