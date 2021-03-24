import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Ticket from "./Ticket";
import NewTicketDialog from "./NewTicketDialog";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketArray, setTicketArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showenTicketArray, setShowenTicketArray] = useState([]);
  const [hideTicketsCounter, setHideTicketCounter] = useState(0);

  const getAllData = () => {
    axios.get(`${BASE_URL}`).then((response) => {
      const tickets = [...response.data];
      const newTickets = tickets.map((ticket) => {
        ticket.creationTime = new Date(ticket.creationTime).toLocaleString();
        return ticket;
      });
      console.log("updated");
      setTicketArray(newTickets);
      setShowenTicketArray(newTickets);
    });
  };

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

  const updateTicketList = () => {
    console.log("Update");
    getAllData();
  };

  useEffect(() => {
    getAllData();
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
        <div className="searchInput">
          <input
            id="searchInput"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Your key word..."
          ></input>
        </div>
        <div className="info">
          <span>showing {showenTicketArray.length} results</span>
          <span>(</span>
          <span id="hideTicketsCounter">{hideTicketsCounter}</span>
          <span> tickets are hidden) </span>
          <Button
            variant="light"
            id="restoreHideTickets"
            onClick={(e) => clickHandler(e)}
          >
            restore
          </Button>
        </div>
      </div>
      <div className="ticketList">
        {showenTicketArray.map((ticket, index) => (
          <Ticket
            ticket={ticket}
            key={index}
            index={index}
            clickHandler={clickHandler}
            deleteTicketFromList={updateTicketList}
          />
        ))}
      </div>
      <NewTicketDialog addTickerToList={updateTicketList} />
    </div>
  );
}

export default Main;
