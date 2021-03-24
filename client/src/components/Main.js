import React, { useState, useEffect } from "react";
import axios from "axios";
import Ticket from "./Ticket";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketArray, setTicketArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("DOM LOADED USE EFFECT");
    axios.get(`${BASE_URL}`).then((response) => {
      const tickets = [...response.data];
      let index = 0;
      const wait = new Promise((resolve, reject) => {
        tickets.forEach((ticket) => {
          ticket.creationTime = new Date(ticket.creationTime).toLocaleString();
          index++;
          if (index === tickets.length - 1) {
            resolve();
          }
        });
      });
      wait.then(() => setTicketArray(tickets));
    });
  }, []);

  useEffect(() => {
    console.log("INPUT VAL USE EFFECT");
    axios
      .get(`${BASE_URL}?searchText=${inputValue}`)
      .then((response) => {
        const tickets = [...response.data];
        let index = 0;
        const wait = new Promise((resolve, reject) => {
          tickets.forEach((ticket) => {
            ticket.creationTime = new Date(
              ticket.creationTime
            ).toLocaleString();
            index++;
            if (index === tickets.length - 1) {
              resolve();
            }
          });
        });
        wait.then(() => setTicketArray(tickets));
      })
      .catch((error) => console.log("EERRORR", error));
  }, [inputValue]);

  return (
    <div className="main">
      {console.log(inputValue)}
      {console.log(ticketArray)}
      <input
        id="searchInput"
        // value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      {ticketArray.map((ticket, index) => (
        <Ticket ticket={ticket} key={index} />
      ))}
    </div>
  );
}

export default Main;
