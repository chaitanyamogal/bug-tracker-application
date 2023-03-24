import Sidebar from "./common/Sidebar";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import TicketTable from "./ticket/TicketTable";
import { getProjectDetails } from "../services/getProjectDetails";
import { getToken } from "../auth";
const Home = () => {
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
      <div>
        <h1>HEllo world</h1>
        <h2>{selectProjectContext.selectedProject}</h2>
        <TicketTable project={project} />
      </div>
    </>
  );
};

export default Home;
