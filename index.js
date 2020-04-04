#!/usr/bin/env node
'use strict';

/**
 * A simple node.js application with a notes command
 * @module index
 */

require('./data/mongoose');

// Requires the library files you will be writing (input, notes)
const Input = require('./lib/input');
const Notes = require('./lib/notes');

// Create our initial notes object
let notes = new Notes();

// Instantiates an “Input” parser
let input = new Input();

notes.execute(input.command);

