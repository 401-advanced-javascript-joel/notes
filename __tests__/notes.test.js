'use strict';

const Notes = require('../lib/notes');

describe('Testing notes module handles add action when supplied valid parameters.', () => {
  test('new note is logged to the console', () => {
    // creating a spy on the console
    const spy = jest.spyOn(console, 'log');
    const notes = new Notes();

    // run add
    notes.add('Hello, I am a test note');

    expect(spy).toHaveBeenCalled();
  });

  test('new note was added to the notes.db', () => {
    // creating a spy on the console
    const notes = new Notes();

    // run add
    notes.add('Hello, I am a test note');

    expect(notes.db[0].note_text).toBe('Hello, I am a test note');
  });
});
