const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const TicketSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  userEmail: {
    required: true,
    type: String,
  },
  done: false,
  creationTime: Date,
  labels: [String],
});

module.exports = mongoose.model("Ticket", TicketSchema);
