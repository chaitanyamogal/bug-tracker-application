import Sidebar from "./common/Sidebar";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import TicketTable from "./ticket/TicketTable";
import { getProjectDetails } from "../services/getProjectDetails";
import { getToken } from "../auth";

const Tickets = () => {
  const token = getToken();
  const selectProjectContext = useContext(userContext);
  const [project, setProject] = useState({ tickets: [] });

  useEffect(() => {
    getProjectDetails(selectProjectContext.selectedProject, token).then((data) => {
      console.log(data);
      setProject(data);
    });
  }, [selectProjectContext]);

  return (
    <>
      <h1 class="h3 mb-2 text-gray-800">Tables</h1>
      <p class="mb-4">
        DataTables is a third party plugin that is used to generate the demo table below. For more
        information about DataTables, please visit the
      </p>
      <TicketTable project={project} />
    </>
  );
};

export default Tickets;
