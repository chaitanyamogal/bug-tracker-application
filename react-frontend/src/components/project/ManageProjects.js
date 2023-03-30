import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../auth";
import { getProjectDetails } from "../../services/getProjectDetails";
import { createProject } from "../../services/project/createProject";
import { getProjectsByCompanyId } from "../../services/project/getProjectsByCompanyId";
import { updateProject } from "../../services/project/updateProject";

const ManageProject = () => {
  const token = getToken();
  //console.log(JSON.parse(localStorage.getItem("data")).user);
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const [editProjectId, setEditProjectId] = useState();

  useEffect(() => {
    getProjectsByCompanyId(companyId, token).then((data) => {
      console.log(data);
      setProjects(data);
    });
  }, []);

  useEffect(() => {
    getProjectDetails(editProjectId, token).then((data) => {
      console.log(data);
      setProjectDetails(data);
    });
  }, [editProjectId]);

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
      setProjects((prevProjects) => {
        return [...prevProjects, data];
      });
      resetForm();
    });
  }

  function handleSubmitEdit(event) {
    event.preventDefault();
    updateProject(editProjectId, projectDetails, token).then((data) => {
      console.log(data);
      setProjects((prevProjects) => {
        return [prevProjects];
      });
      resetForm();
    });
  }

  return (
    <>
      {/* start Header */}
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
        </a>
      </div>

      {/* end Header */}

      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4 ">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    TOTAL Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    YOUR TICKETS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Tasks
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* my Project */}
      {/* <div className="mt-5 ms-5 block-container" style={{ width: "600px" }}>
        <div className="container-title">Manage Project</div>
        <div className="">
          <button className="btn btn-outline-primary float-end mb-3" type="">
            <Link to="/new-ticket">New Issue</Link>
          </button>
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
      </div> */}

      {/* my Project */}

      {/* Start */}
      <div className="row">
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4 shadow">
            <div class="card-header d-flex flex-row align-items-center justify-content-between">
              <h6 class="m-0 font-weight-bold text-primary">Manage Project</h6>
              <button className="btn btn-outline-primary float-end m-0" type="">
                <Link class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  New Project
                </Link>
              </button>
            </div>

            <div class="card-body">
              <div class="chart-area">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
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
