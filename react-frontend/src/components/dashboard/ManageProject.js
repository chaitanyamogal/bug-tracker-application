import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../auth";
import { updateProject } from "../../services/project/updateProject";
import { createProject } from "../../services/project/createProject";
import { getProjectDetails } from "../../services/getProjectDetails";
import { getProjectsByCompanyId } from "../../services/project/getProjectsByCompanyId";
const ManageProject = () => {
  const token = getToken();
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;
  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState();
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    getProjectDetails(editProjectId, token).then((data) => {
      console.log(data);
      setProjectDetails(data);
    });
  }, [editProjectId]);

  useEffect(() => {
    getProjectsByCompanyId(companyId, token).then((data) => {
      console.log(data);
      setProjects(data);
    });
  }, []);

  function handleChange(event, fieldName) {
    setProjectDetails((prevProjectDetails) => {
      return { ...prevProjectDetails, [fieldName]: event.target.value };
    });
  }

  function resetForm() {
    setProjectDetails({
      name: "",
      description: ""
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createProject(companyId, projectDetails, token).then((data) => {
      console.log(data);
      getProjectsByCompanyId(companyId, token).then((data) => {
        console.log(data);
        setProjects(data);
      });
      resetForm();
    });
  }

  function handleSubmitEdit(event) {
    event.preventDefault();
    updateProject(editProjectId, projectDetails, token).then((data) => {
      console.log(data);
      getProjectsByCompanyId(companyId, token).then((data) => {
        console.log(data);
        setProjects(data);
      });
      resetForm();
    });
  }
  return (
    <>
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4 shadow">
          <div className="card-header d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Manage Project</h6>
            <button className="btn btn-outline-primary float-end m-0" type="">
              <Link class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                New Project
              </Link>
            </button>
          </div>

          <div className="card-body">
            <div className="chart-area">
              <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand">
                  <div className=""></div>
                </div>
                <div className="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {projects.map((project) => {
                    return (
                      <>
                        <tr>
                          <td>{project.name}</td>
                          <td>{project.description}</td>
                          <td>
                            <Link
                              onClick={() => {
                                setEditProjectId(project.projectId);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                            >
                              Edit{" "}
                            </Link>
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
        </div>
      </div>

      {/* Create project modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Project
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group mt-3">
                  <label for="usr">Project Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    onChange={(event) => {
                      handleChange(event, "name");
                    }}
                  ></input>
                </div>
                <div class="form-group mt-3">
                  <label for="comment">Project Description:</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    onChange={(event) => {
                      handleChange(event, "description");
                    }}
                  ></textarea>
                </div>
                <div className="text-center pt-1 mb-5 pb-1 mt-3">
                  <button
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 float-end"
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit project modal */}
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Project
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmitEdit}>
                <div class="form-group mt-3">
                  <label for="usr">Project Title:</label>
                  <input
                    type="text"
                    class="form-control"
                    value={projectDetails.name}
                    onChange={(event) => {
                      handleChange(event, "name");
                    }}
                  ></input>
                </div>
                <div class="form-group mt-3">
                  <label for="comment">Project Description:</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    value={projectDetails.description}
                    onChange={(event) => {
                      handleChange(event, "description");
                    }}
                  ></textarea>
                </div>
                <div className="text-center pt-1 mb-5 pb-1 mt-3">
                  <button
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 float-end"
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProject;
