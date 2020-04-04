'use strict';
const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  note:  { 
    type: String, 
    require: true,
  },
  categories: {
    type: Array,
    default: [],
  },
},{
  timestamps: true,
});

// save
notesSchema.pre('save', ()=> {
  console.log('Attempting to save new note...');
});
notesSchema.post('save', ()=> {
  console.log('Finished attempt to save note!');
});

// find
notesSchema.pre('find', ()=> {
  console.log('Attempting to retreive notes...');
});
notesSchema.post('find', ()=> {
  console.log('Finished attempt to retreive notes!');
});

// update
notesSchema.pre('findOneAndUpdate', ()=> {
  console.log('Attempting to update note...');
});
notesSchema.post('findOneAndUpdate', ()=> {
  console.log('Finished attempt to update note!');
});

// delete
notesSchema.pre('findOneAndDelete', ()=> {
  console.log('Attempting to delete note...');
});
notesSchema.post('findOneAndDelete', ()=> {
  console.log('Finished attempt to delete note!');
});

const notesGooseModel = mongoose.model('note', notesSchema);

module.exports = notesGooseModel;

