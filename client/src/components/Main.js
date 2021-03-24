import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "./Ticket";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketArray, setTicketArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showenTicketArray, setShowenTicketArray] = useState([]);
  const [hideTicketsCounter, setHideTicketCounter] = useState(0);

  const clickHandler = (e, value) => {
    if (e.target.className === "hideTicketButton") {
      let tempArr = [...showenTicketArray];
      console.log("VALUe", value);
      tempArr.splice(value, 1);
      setHideTicketCounter((prev) => (prev += 1));
      setShowenTicketArray(tempArr);
    }
    if (e.target.id === "restoreHideTickets") {
      console.log("ticketARRAY", ticketArray);
      setShowenTicketArray([...ticketArray]);
      setHideTicketCounter(0);
    }
  };

  useEffect(() => {
    console.log("DOM LOADED USE EFFECT");
    axios.get(`${BASE_URL}`).then((response) => {
      const tickets = [...response.data];
      const newTickets = tickets.map((ticket) => {
        ticket.creationTime = new Date(ticket.creationTime).toLocaleString();
        return ticket;
      });
      setTicketArray(newTickets);
      setShowenTicketArray(newTickets);
    });
  }, []);

  useEffect(() => {
    console.log("INPUT VAL USE EFFECT");
    axios.get(`${BASE_URL}?searchText=${inputValue}`).then((response) => {
      const tickets = [...response.data];
      const newTickets = tickets.map((ticket) => {
        ticket.creationTime = new Date(ticket.creationTime).toLocaleString();
        return ticket;
      });
      setShowenTicketArray(newTickets);
    });
  }, [inputValue]);

  return (
    <div className="main">
      <div className="header">
        <div>
          <span>showing {showenTicketArray.length} results</span>
          <span>(</span>
          <span id="hideTicketsCounter">{hideTicketsCounter}</span>
          <span> tickets are hidden) </span>
          <button id="restoreHideTickets" onClick={(e) => clickHandler(e)}>
            restore
          </button>
        </div>
        <input
          id="searchInput"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
      </div>
      {showenTicketArray.map((ticket, index) => (
        <Ticket
          ticket={ticket}
          key={index}
          index={index}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  );
}

export default Main;
