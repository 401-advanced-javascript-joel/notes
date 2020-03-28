'use strict';
const notesGooseModel = require('./notes-schema');

/**
 * Models Module
 * @module models
 */

/**
 * This is a wrapper class for the mongoose model created for interacting with a
 * MongoDB collection.
 * @class Model
 */
class Model {

  /**
   * @constructor
   * @param {Mongoose.Model} schema the mongoose model created for interacting 
   * with the collection.
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * @method create
   * creates a new record in the db
   * @param {Object} record the object to be added to the database
   */
  async create(record) {
    try {
      const newNote = await this.schema.create(record);
      if (!newNote) {
        throw new Error('Error no db record created.');
      }
      return newNote;
    } catch (e) {
      console.error('Error:', e.message);
      return false;
    }
  }

  /**
   * @method read
   * reads the matching records from the db
   * @param {Object} record the object which properties must be matched
   * in to be selected from the db
   */
  async read(record) {
    try {
      const notes = await this.schema.find(record);
      if (!notes) {
        throw new Error('No db records found!');
      }
      return notes;
    } catch (e) {
      console.error('Error:', e.message);
      return false;
    }
  }

  /**
   * @method update
   * updates the matching record in the db
   * @param {String} id the id of the record to be updated
   * @param {Object} record the fields in the record to be updated
   */
  async update(id, record) {
    try {
      const updated = await this.schema.findByIdAndUpdate(id,record,{new: true});
      if (!updated) {
        throw new Error(`No db record found with that ID.`);
      }
      return updated;
    } catch (e) {
      console.error('Error:', e.message);
      return false;
    }
  }

  /**
   * @method delete
   * updates the matching record in the db
   * @param {String} id the id of the record to be deleted
   */
  async delete(id) {
    try {
      const deleted = await this.schema.findByIdAndDelete(id);
      if (!deleted) {
        throw new Error('No db record found with that ID.');
      } 
      return deleted;
    } catch (e) {
      console.error('Error:', e.message);
      return false;
    }
  }
}


const notesModel = new Model(notesGooseModel);

module.exports = notesModel;