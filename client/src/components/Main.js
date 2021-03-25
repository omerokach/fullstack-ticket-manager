import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "./Spinner";
import axios from "axios";
import Ticket from "./Ticket";
import ToPageTop from './ToPageTop'
import logo from "../style/apple-touch-icon.png";
import NewTicketDialog from "./NewTicketDialog";
import HeaderLabels from "./HeaderLabels";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketArray, setTicketArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showenTicketArray, setShowenTicketArray] = useState([]);
  const [showByLableArray, setShowByLableArray] = useState([]);
  const [hideTicketsCounter, setHideTicketCounter] = useState(0);
  const [labelArray, setLabelArray] = useState([]);

  function uniq(array) {
    var result = [];
    array.map((item) => {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    });
    console.log("RESULT", result);
    return result;
  }

  const getAllData = () => {
    axios.get(`${BASE_URL}`).then((response) => {
      const tickets = [...response.data];
      var lables = [];
      const newTickets = tickets.map((ticket) => {
        if (ticket.labels !== undefined) {
          lables = [...lables, ...ticket.labels];
        }
        ticket.creationTime = new Date(ticket.creationTime).toLocaleString();
        return ticket;
      });
      lables = uniq(lables);
      console.log("LABELS", lables);
      setLabelArray([...lables]);
      setShowByLableArray(newTickets);
      setTicketArray(newTickets);
      setShowenTicketArray(newTickets);
    });
  };

  const clickHandler = (e, index, id) => {
    if (e.target.className === "hideTicketButton") {
      let tempArr = [...showenTicketArray];
      tempArr.splice(index, 1);
      setHideTicketCounter((prev) => (prev += 1));
      setShowenTicketArray(tempArr);
    }
    if (e.target.id === "restoreHideTickets") {
      console.log("ticketARRAY", ticketArray);
      setShowenTicketArray([...ticketArray]);
      setHideTicketCounter(0);
    }
    if (e.target.className === "header-label") {
      let tempArr = [];
      ticketArray.map((ticket) => {
        if (ticket.hasOwnProperty("labels")) {
          if (ticket.labels.includes(e.target.innerText)) {
            console.log(ticket);
            tempArr = [...tempArr, ticket];
          }
        }
      });
      setShowenTicketArray(tempArr);
    }
  };

  const updateTicketList = () => {
    getAllData();
  };

  useEffect(() => {
    getAllData();
    return <Spinner />;
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
        <div className="header-container">
          <img src={logo}></img>
          <div>
            <div className="searchInput">
              <input
                id="searchInput"
                value={inputValue}
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
            <div className="headers-lable-container">
              {labelArray.map((label, i) => (
                <HeaderLabels
                  labelName={label}
                  key={i}
                  clickHandler={clickHandler}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="ticketList">
        {showenTicketArray < 1 ? (
          <Spinner />
        ) : (
          showenTicketArray.map((ticket, index) => (
            <Ticket
              ticket={ticket}
              key={index}
              index={index}
              clickHandler={clickHandler}
              updateTicketList={updateTicketList}
            />
          ))
        )}
      </div>
      <ToPageTop />
      <NewTicketDialog addTickerToList={updateTicketList} />
    </div>
  );
}

export default Main;
