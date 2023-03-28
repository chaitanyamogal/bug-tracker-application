import Sidebar from "./common/Sidebar";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import TicketTable from "./ticket/TicketTable";
import { getProjectDetails } from "../services/getProjectDetails";
import { getToken } from "../auth";
const Tickets = () => {
  const selectProjectContext = useContext(userContext);
  const [project, setProject] = useState({ tickets: [] });
  const token = getToken();

  useEffect(() => {
    getProjectDetails(selectProjectContext.selectedProject, token).then((data) => {
      console.log(data);
      setProject(data);
    });
  }, [selectProjectContext]);

  return (
    <>
      <div className="ticket-table-container block-container">
        <TicketTable project={project} />
      </div>
    </>
  );
};

export default Tickets;
