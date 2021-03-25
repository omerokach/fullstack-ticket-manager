import axios from "axios";
import React, { useState } from "react";
const BASE_URL = "/api/tickets";

function Ticket(props) {
  const [ticketIndex, setTicketIndex] = useState(props.index);
  const [ticketId, setTicketId] = useState(props.ticket._id);
  const { ticket } = props;

  const doneOrUndone = async (e) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/${ticketId}/${e.target.innerText}`
      );
      props.updateTicketList();
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  const deleteTicket = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/${ticketId}`);
      props.updateTicketList();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <button
        className="hideTicketButton"
        onClick={(e) => props.clickHandler(e, ticketIndex)}
      >
        Hide
      </button>
      <p>{ticket.content}</p>
      <p>
        <span className="ticket-email">{ticket.userEmail}</span> |{" "}
        <span className="ticket-date">{ticket.creationTime}</span>
      </p>
      {ticket.labels
        ? ticket.labels.map((label) => {
            return <span className="label">{label}</span>;
          })
        : null}
      {ticket.done ? <span> done ✔ </span> : null}
      <button
        className="check-button"
        onClick={(e, ticketId) => doneOrUndone(e)}
      >
        {props.ticket.done ? "Undone" : "Done"}
      </button>
      <button id="deleteButton" onClick={() => deleteTicket()}>
        Delete
      </button>
    </div>
  );
}

export default Ticket;
