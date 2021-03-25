const express = require("express");
const Ticket = require("./model/TicketSchema");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build"));
});

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
    { done: isDone === "Done" ? true : false },
    { new: true },
    (err) => {
      if (err) {
        return res.status(500).json({ message: e.message });
      }
    }
  );
  return res.status(200).send({ updated: true });
});

app.post("/api/tickets", (req, res) => {
  const { body } = req;
  try {
    const ticket = new Ticket({
      title: body.title,
      content: body.content,
      userEmail: body.email,
      done: false,
      creationTime: new Date(),
      labels: body.labels,
    });
    ticket
      .save()
      .then(() => {
        res.status(200).json({ message: "succeed" });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(400).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/tickets/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  try {
    Ticket.deleteOne({ _id: ticketId }).then(() => {
      return res.status(200).json({ message: "succeed" });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = app;
