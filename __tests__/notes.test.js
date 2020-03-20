'use strict';

const Notes = require('../lib/notes');

describe('Testing notes module handles add action when supplied valid parameters.', () => {
  test('new note is logged to the console', () => {
    // creating a spy on the console
    const spy = jest.spyOn(console, 'log');
    const notes = new Notes();

    // run add
    notes.execute({ action: 'add', payload: 'Hello, I am a test note' });

    expect(spy).toHaveBeenCalled();
  });

  test('new note is added to the notes.db', () => {
    const notes = new Notes();

    // run add
    notes.execute({ action: 'add', payload: 'Hello, I am a test note' });

    expect(notes.db[0].note_text).toBe('Hello, I am a test note');
  });
});

describe('Testing notes module handles add action when supplied invalid parameters.', () => {
  test('new note isn\'t logged to the console', () => {
    // creating a spy on the console
    const spy = jest.spyOn(console, 'log');
    const notes = new Notes();

    // run add
    notes.execute({ action: 'add', payload: '' });

    expect(spy).toHaveBeenCalled();
  });

  test('new note isn\t added to the notes.db', () => {
    const notes = new Notes();

    // run add
    notes.execute({ action: 'add', payload: '' });

    expect(notes.db[0]).toBe(undefined);
  });
});