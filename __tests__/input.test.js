'use strict';

const Input = require('../lib/input');

describe('Testing input module rejects invalid input', () => {
  test('handles empty input', () => {
    let result = new Input([]);
    expect(result.valid()).toBeFalsy();
  });
  test('handles wrong input format', () => {
    let result = new Input(['WRONG']);
    expect(result.valid()).toBeFalsy();
  });
  test('handles wrong flag input', () => {
    let result = new Input(['-b', 'WRONG']);
    expect(result.valid()).toBeFalsy();
  });
  test('handles wrong data type input', () => {
    let result = new Input(['-a', 'false']);
    expect(result.valid()).toBeFalsy();
  });
});

describe('The instance methods returns the right thing given various valid inputs', () => {
  test('handles valid input', () => {
    let result = new Input(['-a', 'This is a correctly formatted note.']);
    expect(result).toBeTruthy();
  });
});
