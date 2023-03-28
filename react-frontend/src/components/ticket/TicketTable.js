import { Link, useNavigate } from "react-router-dom";

const TicketTable = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <button class="btn btn-outline-primary float-end mb-3" type="">
        <Link to="/new-ticket">New Issue</Link>
      </button>
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
                      <Link to={`/tickets/edit/${ticket.ticketId}`}>Edit </Link>
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
  );
};

export default TicketTable;
