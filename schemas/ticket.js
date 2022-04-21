var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  ticketId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tickets', ticketSchema);
