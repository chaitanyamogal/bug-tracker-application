import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { getToken, getUserId } from "../../auth";
import { getAllProjects } from "../../services/getAllProjects";
const Sidebar = (props) => {
  const userId = getUserId();
  const userDetails = JSON.parse(localStorage.getItem("data")).user;
  const token = getToken();
  const navigate = useNavigate();
  const selectProjectContext = useContext(userContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects(userId, token).then((data) => {
      console.log(data);
      setProjects(data);
      selectProjectContext.setSelectedProject(data[0].projectId);
    });
  }, []);

  function handleProjectChange(event) {
    console.log("Hittttttt");
    selectProjectContext.setSelectedProject(event.target.value);
  }

  return (
    <div
      id="offcanvasScrolling"
      className="d-flex flex-column flex-shrink-0 p-3 "
      style={{ width: "280px", height: "100vh", zIndex: "0", backgroundColor: "white" }}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header">
        <span className="">Welcome,</span>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <p>{userDetails.name}</p>
      <span class="user-role badge rounded-pill text-bg-warning">{userDetails.userRole.role}</span>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleProjectChange}
          >
            {projects.map((project) => {
              return <option value={project.projectId}>{project.name}</option>;
            })}
          </select>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg className="bi me-2" width="16" height="16"></svg>
            Home
          </a>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <span className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16"></svg>
            Dashboard
          </span>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            navigate("/tickets");
          }}
        >
          <span className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16"></svg>
            Tickets
          </span>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16"></svg>
            Products
          </a>
        </li>
      </ul>
      <hr></hr>
    </div>
  );
};

export default Sidebar;
