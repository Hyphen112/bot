var mongoose = require('mongoose');

var snipeSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true,
  },
  authorTag: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('snipes', snipeSchema)
