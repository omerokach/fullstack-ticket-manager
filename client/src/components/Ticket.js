import React, { useState } from "react";

function Ticket(props) {
  const { ticket } = props;
  const [hidden, setHidden] = useState(false);

  const isHidden = (e) => {
    setHidden((prev) => !prev);
    hidden
      ? (e.target.style["visibility"] = "hidden")
      : (e.target.style["visibility"] = "visible");
  };

  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <button className="hideTicketButton" onClick={(e) => isHidden(e)}>
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
