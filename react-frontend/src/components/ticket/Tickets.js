import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import TicketTable from "./TicketTable";
import { getProjectDetails } from "../../services/project/getProjectDetails";
import { getToken } from "../../auth";
import Team from "./Team";

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
      <Team />
    </>
  );
};

export default Tickets;
