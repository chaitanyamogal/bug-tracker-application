import { useEffect, useState, useContext } from "react";
import { getToken, getUserId } from "../../auth";
import { getTicketStatus } from "../../services/ticketService.js/getTicketStatus";
import { getTicketTypes } from "../../services/ticketService.js/getTicketType";
import userContext from "../../context/userContext";
import { getTicketById } from "../../services/ticketService.js/getTicketById";
import { useParams } from "react-router-dom";
import { updateTicket } from "../../services/ticketService.js/updateTicket";

const UpdateTicket = () => {
  const userId = getUserId();
  const token = getToken();
  const { ticketId } = useParams();

  const selectProjectContext = useContext(userContext);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketStatuss, setTicketStatuss] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({
    ticketType: "",
    ticketStatus: "",
    ticketTitle: "",
    ticketDescription: "",
    resolutionSummary: ""
  });

  useEffect(() => {
    getTicketStatus(token).then((data) => {
      console.log(data);
      setTicketStatuss(data);
    });

    getTicketTypes(token).then((data) => {
      console.log(data);
      setTicketTypes(data);
    });

    //console.log(ticketId);
    getTicketById(ticketId, token).then((data) => {
      setTicketDetails({
        ticketType: data.ticketType.ticketTypeId,
        ticketStatus: data.ticketStatus.ticketStatusId,
        ticketTitle: data.ticketTitle,
        ticketDescription: data.ticketDescription,
        resolutionSummary: data.resolutionSummary
      });
      console.log(data);
    });
  }, []);

  function handleChange(event, fieldName) {
    setTicketDetails((prevTicketDetails) => {
      return { ...prevTicketDetails, [fieldName]: event.target.value };
    });
  }

  function resetForm() {
    setTicketDetails({
      ticketType: "",
      ticketStatus: "",
      ticketTitle: "",
      ticketDescription: "",
      resolutionSummary: ""
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateTicket(ticketId, ticketDetails, token).then((data) => {
      console.log(data);
      resetForm();
    });
  }

  return (
    <div class="mt-5 ms-5 block-container" style={{ width: "600px" }}>
      <form onSubmit={handleSubmit}>
        <div class="form-group mt-3">
          <label for="usr">Ticket Title:</label>
          <input
            type="text"
            class="form-control"
            value={ticketDetails.ticketTitle}
            onChange={(event) => {
              handleChange(event, "ticketTitle");
            }}
          ></input>
        </div>
        <div class="form-group mt-3">
          <label for="comment">Ticket Description:</label>
          <textarea
            class="form-control"
            rows="5"
            value={ticketDetails.ticketDescription}
            onChange={(event) => {
              handleChange(event, "ticketDescription");
            }}
          ></textarea>
        </div>
        <div class="form-group mt-3">
          <label for="comment">Ticket Resolution Summary:</label>
          <textarea
            class="form-control"
            rows="5"
            value={ticketDetails.resolutionSummary}
            onChange={(event) => {
              handleChange(event, "resolutionSummary");
            }}
          ></textarea>
        </div>
        <div class="form-group mt-3">
          <label>Ticket type:</label>
          <option selected disabled hidden>
            Choose here
          </option>
          <select
            class="form-control"
            value={ticketDetails.ticketType}
            onChange={(event) => {
              handleChange(event, "ticketType");
            }}
          >
            {ticketTypes.map((ticketType) => {
              return <option value={ticketType.ticketTypeId}>{ticketType.type}</option>;
            })}
          </select>
        </div>
        <div class="form-group mt-3">
          <label>Ticket Status:</label>
          <select
            class="form-control"
            value={ticketDetails.ticketStatus}
            onChange={(event) => {
              handleChange(event, "ticketStatus");
            }}
          >
            <option selected disabled hidden>
              Choose here
            </option>
            {ticketStatuss.map((ticketStatus) => {
              return <option value={ticketStatus.ticketStatusId}>{ticketStatus.status}</option>;
            })}
          </select>
        </div>
        <div className="text-center pt-1 mb-5 pb-1 mt-3">
          <button
            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 float-end"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicket;
