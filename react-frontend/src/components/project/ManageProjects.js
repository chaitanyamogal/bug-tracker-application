import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../auth";
import { getProjectsByCompanyId } from "../../services/project/getProjectsByCompanyId";

const ManageProject = () => {
  const token = getToken();
  console.log(JSON.parse(localStorage.getItem("data")).user);
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjectsByCompanyId(companyId, token).then((data) => {
      console.log(data);
      setProjects(data);
    });
  });

  return (
    <div class="mt-5 ms-5 block-container" style={{ width: "600px" }}>
      <div className="container-title">Manage Project</div>
      <div className="">
        <button class="btn btn-outline-primary float-end mb-3" type="">
          <Link to="/new-ticket">New Issue</Link>
        </button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {projects.map((project) => {
              return (
                <>
                  <tr>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>
                      <Link to={`edit/${project.projectId}`}>Edit </Link>
                      <Link to={`${project.projectId}`}> View</Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProject;
