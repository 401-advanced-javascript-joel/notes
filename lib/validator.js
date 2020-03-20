'use strict';
/**
 * Validator Module
 * @module validator
 */

/**
  * Represents the validator object
  * @class Validator
  */
class Validator {

  /**
   * @constructor
   * @param schema A set of schema for the passed object to follow
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * @method validate
   * Takes an object and and compares it against the schema 
   * @param object an object to be tested
   */
  validate(object) {
    for(let field in this.schema) {
      // check if required
      if (this.schema[field].required && this.schema[field].required === true) {    
        if (!object[field]) return false;
      } else {
        console.log(field, 'not reqired. Type:', typeof []);
      }
      // check if correctly typed
      if (object[field]) {
        if (typeof object[field] !== this.schema[field].type) return false;
      }
    }
    return true;
  }
} 

module.exports = Validator;