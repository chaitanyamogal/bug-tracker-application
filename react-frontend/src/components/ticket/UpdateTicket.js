import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../auth";
import { getTicketStatus } from "../../services/ticketService.js/getTicketStatus";
import { getTicketTypes } from "../../services/ticketService.js/getTicketType";
import { getTicketById } from "../../services/ticketService.js/getTicketById";
import { updateTicket } from "../../services/ticketService.js/updateTicket";

const UpdateTicket = () => {
  const navigate = useNavigate();
  const token = getToken();
  const { ticketId } = useParams();

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
      setTicketStatuss(data);
    });

    getTicketTypes(token).then((data) => {
      setTicketTypes(data);
    });

    getTicketById(ticketId, token).then((data) => {
      setTicketDetails({
        ticketType: data.ticketType.ticketTypeId,
        ticketStatus: data.ticketStatus.ticketStatusId,
        ticketTitle: data.ticketTitle,
        ticketDescription: data.ticketDescription,
        resolutionSummary: data.resolutionSummary
      });
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
      resetForm();
      navigate("/tickets");
    });
  }

  return (
    <>
      {/* Start */}

      <div className="row">
        <div className="col-xl-9 col-lg-7 mt-4">
          <div className="card shadow mb-4 shadow">
            <div className="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Edit ticket</h6>
            </div>

            <div className="card-body">
              <div className="chart-area">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label>Ticket Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ticketDetails.ticketTitle}
                      onChange={(event) => {
                        handleChange(event, "ticketTitle");
                      }}
                    ></input>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group mt-3">
                        <label>Ticket Description:</label>
                        <textarea
                          className="form-control"
                          rows="5"
                          value={ticketDetails.ticketDescription}
                          onChange={(event) => {
                            handleChange(event, "ticketDescription");
                          }}
                        ></textarea>
                      </div>
                      <div className="form-group mt-3">
                        <label for="comment">Ticket Resolution Summary:</label>
                        <textarea
                          className="form-select"
                          rows="5"
                          value={ticketDetails.resolutionSummary}
                          onChange={(event) => {
                            handleChange(event, "resolutionSummary");
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mt-3">
                        <label>Ticket type:</label>
                        <select
                          class="form-select"
                          value={ticketDetails.ticketType}
                          onChange={(event) => {
                            handleChange(event, "ticketType");
                          }}
                        >
                          <option selected disabled hidden>
                            Choose here
                          </option>
                          {ticketTypes.map((ticketType) => {
                            return (
                              <option value={ticketType.ticketTypeId}>{ticketType.type}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <label>Ticket Status:</label>
                        <select
                          className="form-select"
                          value={ticketDetails.ticketStatus}
                          onChange={(event) => {
                            handleChange(event, "ticketStatus");
                          }}
                        >
                          <option selected disabled hidden>
                            Choose here
                          </option>
                          {ticketStatuss.map((ticketStatus) => {
                            return (
                              <option value={ticketStatus.ticketStatusId}>
                                {ticketStatus.status}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTicket;
