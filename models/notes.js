const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  note:  { 
    type: String, 
    require: true,
  },
  categories: Array,
},{
  timestamps: true,
});

const NotesModule = mongoose.model('note', notesSchema);

module.exports = NotesModule;

