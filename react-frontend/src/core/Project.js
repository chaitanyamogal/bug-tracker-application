import { useEffect, useState } from "react";
import getProjectDetails from "./helpers/getProject";

const Project = () => {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {}, [ticket]);

  function getProject() {
    getProjectDetails().then((response) => {
      console.log(response.tickets[0]);
      setTicket(response.tickets);
      //console.log(ticket);
    });
  }

  return (
    <>
      <button onClick={getProject}>Get Project</button>
      <ul>
        {ticket.map((ticket) => {
          return <li key={ticket.ticketId}>{ticket.ticketTitle}</li>;
        })}
      </ul>
    </>
  );
};

export default Project;
