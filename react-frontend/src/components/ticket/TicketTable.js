import { Link, useNavigate } from "react-router-dom";

const TicketTable = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Start */}

      <div className="row">
        <div class="col-xl-12 col-lg-10">
          <div class="card shadow mb-4 shadow">
            <div class="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">All Tickets</h6>
              <button className="btn btn-outline-primary float-end m-0" type="">
                <Link to="/new-ticket">New Issue</Link>
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
                <table class="table">
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
                  <tbody class="table-group-divider">
                    {props.project.tickets.map((ticket) => {
                      return (
                        <>
                          <tr onClick={() => navigate(`${ticket.ticketId}`)}>
                            <td>{ticket.ticketId}</td>
                            <td>{ticket.ticketTitle}</td>
                            <td>{ticket.createdByUserId.name}</td>
                            <td>{ticket.ticketStatus.status}</td>
                            <td>{ticket.ticketType.type}</td>
                            <td>
                              <span style={{ marginRight: "10px" }}>
                                <i class="bi-pencil-square"></i>
                                <Link to={`edit/${ticket.ticketId}`}>Edit </Link>
                                {/* <p onClick={() => navigate(`/tickets/edit/${ticket.ticketId}`)}>Edit</p> */}
                              </span>
                              <span>
                                <Link to={`/tickets/${ticket.ticketId}`}> View</Link>
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
