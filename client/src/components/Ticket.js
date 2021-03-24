import React, { useState } from "react";

function Ticket(props) {
  const [ticketIndex, setTicketId] = useState(props.index);
  const { ticket } = props;

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
    </div>
  );
}

export default Ticket;
