import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../auth";
import { getTicketById } from "../../services/ticketService.js/getTicketById";
import TicketComment from "./TicketComment";

const TicketDetails = () => {
  const navigate = useNavigate();
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
      {/* <div className="block-container">
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
        <TicketComment ticketId={ticketId} />
      </div> */}

      {/* Start */}
      <div className="row">
        <div class="col-xl-9 col-lg-7 mt-4">
          <div class="card shadow mb-4 shadow">
            <div class="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Ticket details</h6>
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                type=""
                onClick={() => navigate(`/tickets/edit/${ticketId}`)}
              >
                Edit
              </button>
            </div>

            <div class="card-body">
              <div class="chart-area">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>

                <div class="form-group mt-3">
                  <label for="usr">
                    <b>Ticket Title : </b>
                  </label>
                  <p>{ticketDetails.ticketTitle}</p>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="form-group mt-3">
                      <label for="comment">
                        <b>Ticket Description : </b>
                      </label>
                      <textarea
                        class="form-control"
                        rows="5"
                        value={ticketDetails.ticketDescription}
                        disabled
                      >
                        {ticketDetails.ticketDescription}
                      </textarea>
                    </div>
                    <div class="form-group mt-3">
                      <label for="comment">
                        <b>Ticket Resolution Summary : </b>
                      </label>
                      <textarea
                        class="form-control"
                        value={ticketDetails.resolutionSummary}
                        rows="5"
                        disabled
                      >
                        {ticketDetails.resolutionSummary}
                      </textarea>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group mt-4 mb-5">
                      <div class="form-group mt-3">
                        <label>
                          <b>Ticket type : </b>
                          {ticketDetails.ticketType === "Task" && (
                            <span class="ticket-badge badge text-bg-primary">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Bug" && (
                            <span class="ticket-badge badge text-bg-danger">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Issue" && (
                            <span class="ticket-badge badge text-bg-warning">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Suggestion" && (
                            <span class="ticket-badge badge text-bg-info">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Feature" && (
                            <span class="ticket-badge badge text-bg-success">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                        </label>
                      </div>
                      <div class="form-group mt-3">
                        <label>
                          <b>Ticket Status : </b>
                          {ticketDetails.ticketStatus}
                        </label>
                      </div>
                    </div>
                    <div class="form-group mt-5 pt-5">
                      <div className="created-user mt-3">
                        <p>
                          <b>Created By - </b>
                          {ticketDetails.createdByName} (<i>{ticketDetails.createdByEmail}</i>)
                        </p>
                      </div>
                      <div className="created-date mt-3">
                        <p>
                          {" "}
                          <b>Created Date - </b>
                          {ticketDetails.createdDate}
                        </p>
                      </div>
                      <div className="updated-date mt-3">
                        <p>
                          <b>Updated Date - </b>
                          {ticketDetails.updatedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <TicketComment ticketId={ticketId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
