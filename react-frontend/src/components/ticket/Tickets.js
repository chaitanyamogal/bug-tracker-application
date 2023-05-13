import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import { getToken } from "../../auth";
import TicketTable from "./TicketTable";
import { getProjectDetails } from "../../services/project/getProjectDetails";
import Team from "./Team";

const Tickets = () => {
  const token = getToken();
  const selectProjectContext = useContext(userContext);

  const [project, setProject] = useState({ tickets: [] });

  useEffect(() => {
    getProjectDetails(selectProjectContext.selectedProject, token).then((data) => {
      setProject(data);
    });
  }, [selectProjectContext]);

  return (
    <>
      <div className="mt-4 ms-1">
        <h1 className="h3 mb-2 text-gray-800">Ticket Tables</h1>
        <p className="mb-4">
          All tickets for this project are listed below. To change project select project from
          sidebar.
        </p>
      </div>
      <TicketTable project={project} />
      <Team />
    </>
  );
};

export default Tickets;
