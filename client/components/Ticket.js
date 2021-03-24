import React from 'react';

function Ticket(props) {
    const {ticket} = props 
    return (
        <div id="ticket">
            <button className="hideTicketButton"></button>
            <h1></h1>
            <p></p>
            <p><span className="ticket-email"></span>|<span className="ticket-date"></span></p>
            {
              ticket.label? '':''  
            }
        </div>
    );
}

export default Ticket;