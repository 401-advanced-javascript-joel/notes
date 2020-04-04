'use strict';

const Validator = require('../lib/validator');

describe('Testing validator module handles validate when supplied valid parameters.', () => {
  test('validate returns true with correct valid input', () => {
    const validator = new Validator({
      id: {type: 'string', required: true},
      name: {type: 'string', required: true},
      age: {type: 'number', required: true},
    });

    // run add
    const result = validator.validate({
      id:'123-45-6789',
      name:'Susan McDeveloperson',
      age: 37,
    });
    expect(result).toBeTruthy();
  });

  test('validate returns true with correct valid input', () => {
    const validator = new Validator({ 
      action: { type: 'string', required: true },
      id: { type: 'number', required: true },
    });

    // run add
    const result = validator.validate({ action: 'apple', id: 1 });
    expect(result).toBeTruthy();
  });
});

describe('Testing validator module handles validate when supplied invalid parameters.', () => {
  test('validate returns false with correct invalid input', () => {
    // creating a spy on the console
    const validator = new Validator({
      id: {type: 'string', required: true},
      name: {type: 'string', required: true},
      age: {type: 'number', required: true},
      children: { type: 'array', valueType: 'string' },
    });
    // run add
    const result = validator.validate({
      id:38,
      name:'Freddy McCoder',
      children:[],
    });
    expect(result).toBeFalsy();
  });
  
  test('validate returns false with correct invalid input', () => {
    const validator = new Validator({ 
      action: { type: 'string', required: true },
      id: { type: 'boolean', required: true },
    });
    // run add
    const result = validator.validate({});
    expect(result).toBeFalsy();
  });
});