import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import { getToken, getUserId } from "../../auth";
import { getAllProjects } from "../../services/getAllProjects";
const Sidebar = (props) => {
  const selectProjectContext = useContext(userContext);

  const userId = getUserId();
  const [projects, setProjects] = useState([]);
  const token = getToken();
  useEffect(() => {
    getAllProjects(userId, token).then((data) => {
      console.log(data);
      setProjects(data);
      //selectProjectContext.setSelectedProject(data[0].projectId);
    });
  }, []);

  function handleProjectChange(event) {
    console.log("Hittttttt");
    selectProjectContext.setSelectedProject(event.target.value);
  }

  return (
    <div className="wrapper d-flex col-3" style={{ width: "20%" }}>
      <div className="sidebar">
        <div className="user-details-container" style={{ height: "85px", paddingLeft: "18px" }}>
          <div className="user-details">
            <p>Welcome,</p>
            <p>{props.user.data.name}</p>
            <span className="badge text-bg-primary">Admin</span>
          </div>
        </div>
        <small className="text-muted px-3">PRODUCTIVITY TOOLS</small>
        <ul>
          <li>
            <a href="#">Dashbord</a>
          </li>
          <li>
            <Link to="/tickets">Tickets</Link>
          </li>
          <li>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleProjectChange}
            >
              {projects.map((project) => {
                return <option value={project.projectId}>{project.name}</option>;
              })}
            </select>
          </li>
          <li>
            <a href="#">Admin</a>
          </li>
          <li>
            <a href="#">Notifications</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
