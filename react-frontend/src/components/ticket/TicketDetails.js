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
    });
  }, []);

  return (
    <>
      {/* Start */}
      <div className="row">
        <div className="col-xl-9 col-lg-7 mt-4">
          <div className="card shadow mb-4 shadow">
            <div className="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Ticket details</h6>
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                type=""
                onClick={() => navigate(`/tickets/edit/${ticketId}`)}
              >
                Edit
              </button>
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

                <div className="form-group mt-3">
                  <label>
                    <b>Ticket Title : </b>
                  </label>
                  <p>{ticketDetails.ticketTitle}</p>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group mt-3">
                      <label>
                        <b>Ticket Description : </b>
                      </label>
                      <textarea
                        className="form-control"
                        rows="5"
                        value={ticketDetails.ticketDescription}
                        disabled
                      >
                        {ticketDetails.ticketDescription}
                      </textarea>
                    </div>
                    <div className="form-group mt-3">
                      <label>
                        <b>Ticket Resolution Summary : </b>
                      </label>
                      <textarea
                        className="form-control"
                        value={ticketDetails.resolutionSummary}
                        rows="5"
                        disabled
                      >
                        {ticketDetails.resolutionSummary}
                      </textarea>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mt-4 mb-5">
                      <div className="form-group mt-3">
                        <label>
                          <b>Ticket type : </b>
                          {ticketDetails.ticketType === "Task" && (
                            <span className="ticket-badge badge text-bg-primary">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Bug" && (
                            <span className="ticket-badge badge text-bg-danger">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Issue" && (
                            <span className="ticket-badge badge text-bg-warning">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Suggestion" && (
                            <span className="ticket-badge badge text-bg-info">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                          {ticketDetails.ticketType === "Feature" && (
                            <span className="ticket-badge badge text-bg-success">
                              {ticketDetails.ticketType}
                            </span>
                          )}
                        </label>
                      </div>
                      <div className="form-group mt-3">
                        <label>
                          <b>Ticket Status : </b>
                          {ticketDetails.ticketStatus}
                        </label>
                      </div>
                    </div>
                    <div className="form-group mt-5 pt-5">
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
