import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserId, getToken } from "../../auth";
import { getTicketById } from "../../services/ticketService.js/getTicketById";
import TicketComment from "./TicketComment";

const TicketDetails = () => {
  const userId = getUserId();
  const token = getToken();
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState({
    ticketType: "",
    ticketStatus: "",
    ticketTitle: "",
    ticketDescription: "",
    resolutionSummary: "",
    createdByName: "",
    createdByEmail: "",
    createdDate: "",
    updatedDate: "",
    comments: []
  });

  useEffect(() => {
    getTicketById(ticketId, token).then((data) => {
      setTicketDetails({
        ticketType: data.ticketType.type,
        ticketStatus: data.ticketStatus.status,
        ticketTitle: data.ticketTitle,
        ticketDescription: data.ticketDescription,
        resolutionSummary: data.resolutionSummary,
        createdByName: data.createdByUserId.name,
        createdByEmail: data.createdByUserId.email,
        createdDate: data.createdDate,
        updatedDate: data.updateDate,
        comments: data.comments
      });
      console.log(data);
    });
  }, []);

  return (
    <>
      <div class="mt-5 ms-5" style={{ width: "600px" }}>
        <button class="btn btn-outline-primary float-end mb-3" type="">
          <Link to={`/tickets/edit/${ticketId}`}>Edit</Link>
        </button>
        <div className="ticket-title">
          <p>Ticket title - {ticketDetails.ticketTitle}</p>
        </div>
        <div className="ticket-description">
          <p>Ticket Description - {ticketDetails.ticketDescription}</p>
        </div>
        <div className="resolution-summary">
          <p>Ticket Resolution Summary - {ticketDetails.resolutionSummary}</p>
        </div>
        <div className="ticket-type-status">
          <p>Ticket Type - {ticketDetails.ticketType}</p>
          <br></br>
          <p>Ticket Status - {ticketDetails.ticketStatus}</p>
        </div>
        <div className="created-user">
          <p>
            Created By - {ticketDetails.createdByName} Email - {ticketDetails.createdByEmail}
          </p>
        </div>
        <div className="created-date">
          <p>Created Date - {ticketDetails.createdDate}</p>
        </div>
        <div className="updated-date">
          <p>Updated Date - {ticketDetails.updatedDate}</p>
        </div>
      </div>
      <TicketComment comments={ticketDetails.comments} />
    </>
  );
};

export default TicketDetails;
