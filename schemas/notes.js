var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  guildId: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  notes: { 
    type: [Object], 
    required: true
  },
});

module.exports = mongoose.model('notes', noteSchema);
