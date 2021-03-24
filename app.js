const express = require("express");
const Ticket = require("./model/TicketSchema");
const cors = require("cors");
const app = express();

app.use(express.static("client/build"));
app.use(cors());

app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  try {
    if (!searchText) {
      Ticket.find().then((data) => {
        return res.status(200).json(data);
      });
    } else {
      Ticket.find({ title: new RegExp(searchText, "i") }).then((data) => {
        return res.status(200).json(data);
      });
    }
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
});

app.patch("/api/tickets/:ticketId/:isDone", async (req, res) => {
  const ticketId = req.params.ticketId;
  const isDone = req.params.isDone;
  try {
    await Ticket.findById(ticketId);
  } catch (error) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  await Ticket.findByIdAndUpdate(
    ticketId,
    { done: isDone === "done" ? true : false },
    { new: true },
    (err) => {
      if (err) {
        return res.status(500).json({ message: e.message });
      }
    }
  );
  return res.status(200).send({ updated: true });
});

module.exports = app;
