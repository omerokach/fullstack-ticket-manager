const express = require("express");
const Ticket = require("./model/TicketSchema");
const cors = require("cors");
const app = express();

app.use(express.static("client/build"));
app.use(cors());

app.get("/api/tickets", (req, res) => {
  //   res.status(200).json({ hello: "world" });
  const { searchText } = req.query;
  try {
    Ticket.find().then((data) => {
      if (!searchText) {
        return res.status(200).json(data);
      } else {
        const re = new RegExp(searchText, "i");
        const tickets = data.filter((ticket) => re.test(ticket.title));
        if (tickets.length === 0) {
          return res.status(400).json({ message: "No match for text" });
        } else {
          return res.status(200).json(tickets);
        }
      }
    });
  } catch (error) {
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
