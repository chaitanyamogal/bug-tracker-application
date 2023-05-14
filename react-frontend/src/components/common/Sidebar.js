import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { getToken, getUserId } from "../../auth";
import { getAllProjects } from "../../services/project/getAllProjects";
import { getUserById } from "../../services/userService/getUserById";

const Sidebar = () => {
  const navigate = useNavigate();
  const userId = getUserId();
  const token = getToken();
  const selectProjectContext = useContext(userContext);

  const [projects, setProjects] = useState([]);
  const [userDetails, setUserDetails] = useState({
    userId: 0,
    email: "",
    name: "",
    company: {
      companyId: 0,
      companyName: "",
      companyDescription: ""
    },
    userRole: {
      roleId: 0,
      role: ""
    }
  });

  useEffect(() => {
    getAllProjects(userId, token).then((response) => {
      if (response.status === 201 || response.status === 200) {
        setProjects(response.data);
        selectProjectContext.setSelectedProject(response.data[0].projectId);
      } else {
        navigate("/login");
      }
    });
    getUserById(userId, token).then((data) => {
      setUserDetails(data);
    });
  }, []);

  function handleProjectChange(event) {
    selectProjectContext.setSelectedProject(event.target.value);
  }

  return (
    <div
      id="offcanvasScrolling"
      className="d-flex flex-column flex-shrink-0 p-3 col-2"
      style={{ zIndex: "1", backgroundColor: "white" }}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div>
        <strong>
          <i className="company-name-header">{selectProjectContext.company}</i>
        </strong>
      </div>
      <div className="offcanvas-header">
        <span className="">Welcome,</span>
        <button
          type="button"
          className="btn-close text-reset d-none"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <p>{userDetails.name}</p>
      <span className="user-role badge rounded-pill text-bg-warning">
        {userDetails.userRole.role}
      </span>
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
        <li
          className="nav-item"
          onClick={() => {
            navigate("/stats");
          }}
        >
          <span className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16"></svg>
            Stats
          </span>
        </li>
      </ul>
      <hr></hr>
    </div>
  );
};

export default Sidebar;
