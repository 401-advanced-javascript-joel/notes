'use strict';

const Input = require('../lib/input');

describe('The instance methods returns the right thing given various valid inputs', () => {
  test('creates a new input with an empty command', () => {
    let result = new Input();
    expect(result.command).toEqual({});
  });
});
