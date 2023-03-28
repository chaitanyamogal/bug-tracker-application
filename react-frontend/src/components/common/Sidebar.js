import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { getToken, getUserId } from "../../auth";
import { getAllProjects } from "../../services/getAllProjects";
const Sidebar = (props) => {
  const userId = getUserId();
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
    // <div
    //   className="offcanvas offcanvas-start"
    //   data-bs-scroll="true"
    //   data-bs-backdrop="false"
    //   tabindex="-1"
    //   id="offcanvasScrolling"
    //   aria-labelledby="offcanvasScrollingLabel"
    // >
    // <div
    //   classNameName="wrapper d-flex col-3 "
    //   id="offcanvasScrolling"
    //   style={{ width: "20%" }}
    //   data-bs-scroll="true"
    //   data-bs-backdrop="false"
    //   tabindex="-1"
    // >
    //   <div classNameName="sidebar">
    //     <div classNameName="user-details-container" style={{ height: "85px", paddingLeft: "18px" }}>
    //       <div classNameName="user-details">
    //         <p>Welcome,</p>
    //         <p>{props.user.data.name}</p>
    //         <span classNameName="badge text-bg-primary">Admin</span>
    //       </div>
    //     </div>
    //     <small classNameName="text-muted px-3">PRODUCTIVITY TOOLS</small>
    //     <ul>
    //       <li>
    //         <a href="#">Dashbord</a>
    //       </li>
    //       <li>
    //         <Link to="/tickets">Tickets</Link>
    //       </li>
    //       <li>
    //         <select
    //           className="form-select"
    //           aria-label="Default select example"
    //           onChange={handleProjectChange}
    //         >
    //           {projects.map((project) => {
    //             return <option value={project.projectId}>{project.name}</option>;
    //           })}
    //         </select>
    //       </li>
    //       <li>
    //         <a href="#">Admin</a>
    //       </li>
    //       <li>
    //         <a href="#">Notifications</a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    // </div>

    <div
      id="offcanvasScrolling"
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px", height: "100vh" }}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div class="offcanvas-header">
        <span className="fs-4">Sidebar</span>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <hr></hr>
      <ul className="nav nav-pills flex-column mb-auto">
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
      </ul>
      <hr></hr>
    </div>
  );
};

export default Sidebar;
