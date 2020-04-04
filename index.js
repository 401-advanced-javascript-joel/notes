#!/usr/bin/env node
'use strict';

/**
 * A simple node.js application with a notes command
 * @module index
 */

const mongoose = require('mongoose');
require('./data/mongoose');

// Requires the library files you will be writing (input, notes)
const Input = require('./lib/input');
const Notes = require('./lib/notes');

// Create our initial notes object
let notes = new Notes();
// Instantiates an “Input” parser
let input = new Input();

const run = async () => {
  try {
    let result = await notes.execute(input.command);
    mongoose.disconnect();
    //log result or results to console.
    if (Array.isArray(result)) {
      result.forEach(note => {
        console.log('ID:', note.id, 'Note:', note.categories, '-', note.note);
      });
    } else {
      console.log('ID:', result.id, 'Note:', result.categories, '-', 
        result.note);
    }    
  } catch (e) {
    console.error(e);
  }
};
run();