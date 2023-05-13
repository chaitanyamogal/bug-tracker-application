import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const TicketTable = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Start */}
      <div className="row">
        <div className="col-xl-12 col-lg-10">
          <div className="card shadow mb-4 shadow ticket-table">
            <div className="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">All Tickets</h6>
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                type=""
                onClick={() => navigate("/new-ticket")}
              >
                New Ticket
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Ticket Author</th>
                      <th scope="col">Status</th>
                      <th scope="col">Type</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {props.project.tickets.map((ticket) => {
                      return (
                        <>
                          <tr onClick={() => navigate(`${ticket.ticketId}`)}>
                            <td>{ticket.ticketId}</td>
                            <td>{ticket.ticketTitle}</td>
                            <td>{ticket.createdByUserId.name}</td>
                            <td>{ticket.ticketStatus.status}</td>
                            {ticket.ticketType.type === "Task" && (
                              <td>
                                <span className="ticket-badge badge text-bg-primary">
                                  {ticket.ticketType.type}
                                </span>
                              </td>
                            )}
                            {ticket.ticketType.type === "Bug" && (
                              <td>
                                <span className="ticket-badge badge text-bg-danger">
                                  {ticket.ticketType.type}
                                </span>
                              </td>
                            )}
                            {ticket.ticketType.type === "Issue" && (
                              <td>
                                <span className="ticket-badge badge text-bg-warning">
                                  {ticket.ticketType.type}
                                </span>
                              </td>
                            )}
                            {ticket.ticketType.type === "Suggestion" && (
                              <td>
                                <span className="ticket-badge badge text-bg-info">
                                  {ticket.ticketType.type}
                                </span>
                              </td>
                            )}
                            {ticket.ticketType.type === "Feature" && (
                              <td>
                                <span className="ticket-badge badge text-bg-success">
                                  {ticket.ticketType.type}
                                </span>
                              </td>
                            )}
                            <td>
                              <span style={{ marginRight: "10px" }}>
                                <Link to={`edit/${ticket.ticketId}`}>
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                              </span>
                              <span>
                                <Link to={`/tickets/${ticket.ticketId}`}>
                                  <i className="bi bi-eye-fill"></i>
                                </Link>
                              </span>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketTable;
