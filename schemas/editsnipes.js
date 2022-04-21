var mongoose = require('mongoose');

var eSnipeSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  authorTag: {
    type: String,
    required: true
  },
  unedited: {
    type: String,
    required: true
  },
  edited: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('editSnipes', eSnipeSchema);
