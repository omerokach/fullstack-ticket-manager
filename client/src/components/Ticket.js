import axios from "axios";
import React, { useState } from "react";
const BASE_URL = "/api/tickets";

function Ticket(props) {
  const [ticketIndex, setTicketIndex] = useState(props.index);
  const [ticketId, setTicketId] = useState(props.ticket._id);
  const { ticket } = props;

  const deleteTicket = async () => {
    try {
      console.log("ticketId", ticketId);
      console.log("ticket", ticket);
      const res = await axios.delete(`${BASE_URL}/${ticketId}`);
      props.deleteTicketFromList();
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
      {console.log("ticket.labels", ticket.labels)}
      {ticket.labels
        ? ticket.labels.map((label) => {
            return <span className="label">{label}</span>;
          })
        : null}
      <button id="deleteButton" onClick={() => deleteTicket()}>
        Delete
      </button>
    </div>
  );
}

export default Ticket;
