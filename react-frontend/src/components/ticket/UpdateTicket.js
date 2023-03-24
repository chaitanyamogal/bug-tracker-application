import { useEffect, useState, useContext } from "react";
import { getToken, getUserId } from "../../auth";
import { getTicketStatus } from "../../services/ticketService.js/getTicketStatus";
import { getTicketTypes } from "../../services/ticketService.js/getTicketType";
import userContext from "../../context/userContext";
import { createTicket } from "../../services/ticketService.js/createTicket";
import { getTicketById } from "../../services/ticketService.js/getTicketById";
import { useSearchParams } from "react-router-dom";

const UpdateTicket = () => {
  const userId = getUserId();
  const token = getToken();
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

  const [searchParams, setSearchParams] = useSearchParams();
  //   const [ticketId, setTicketId] = useState();
  //   setTicketId(searchParams.get("ticketId"));

  //   useEffect(() => {
  //     console.log(ticketId);
  //   }, []);

  useEffect(() => {
    getTicketStatus(token).then((data) => {
      console.log(data);
      setTicketStatuss(data);
    });

    getTicketTypes(token).then((data) => {
      console.log(data);
      setTicketTypes(data);
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
    createTicket(userId, selectProjectContext.selectedProject, ticketDetails, token).then(
      (data) => {
        console.log(data);
        resetForm();
      }
    );
  }

  return (
    <div class="mt-5 ms-5" style={{ width: "600px" }}>
      <form onSubmit={handleSubmit}>
        <div class="form-group mt-3">
          <label for="usr">Ticket Title:</label>
          <input
            type="text"
            class="form-control"
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
