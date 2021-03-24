const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const TicketSchema = new Schema({
  title: {
    require: true,
    type: String,
  },
  content: {
    require: true,
    type: String,
  },
  userEmail: {
    require: true,
    type: String,
  },
  done: false,
  creationTime: Date,
  labels: [String],
});

module.exports = mongoose.model("Ticket", TicketSchema);
