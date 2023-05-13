import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserDetail, getToken } from "../../auth";
import { updateProject } from "../../services/project/updateProject";
import { createProject } from "../../services/project/createProject";
import { getProjectDetails } from "../../services/project/getProjectDetails";
import { getProjectsByCompanyId } from "../../services/project/getProjectsByCompanyId";
import { getUsersByCompany } from "../../services/userService/getUsersByCompany";
import { assignProjectToUser } from "../../services/userService/assignProjectToUser";

const ManageProject = () => {
  const token = getToken();
  const user = getCurrentUserDetail();
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;

  const [projects, setProjects] = useState([]);
  const [editProjectId, setEditProjectId] = useState();
  const [projectDetails, setProjectDetails] = useState({});
  const [companyUsers, setCompanyUsers] = useState([]);
  const [assignUser, setAssignUser] = useState({ assignToProjectId: undefined, userId: undefined });

  useEffect(() => {
    getProjectDetails(editProjectId, token).then((data) => {
      setProjectDetails(data);
    });
  }, [editProjectId]);

  useEffect(() => {
    getProjectsByCompanyId(companyId, token).then((data) => {
      setProjects(data);
    });
  }, []);

  function handleChange(event, fieldName) {
    setProjectDetails((prevProjectDetails) => {
      return { ...prevProjectDetails, [fieldName]: event.target.value };
    });
  }

  function assignUserToProject() {
    getUsersByCompany(companyId, token).then((data) => {
      setCompanyUsers(data);
    });
  }

  function handleSubmitAssignUser() {
    assignProjectToUser(assignUser.userId, assignUser.assignToProjectId, token).then((data) => {});
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
      getProjectsByCompanyId(companyId, token).then((data) => {
        setProjects(data);
      });
      resetForm();
    });
  }

  function handleSubmitEdit(event) {
    event.preventDefault();
    updateProject(editProjectId, projectDetails, token).then((data) => {
      getProjectsByCompanyId(companyId, token).then((data) => {
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
            {(user.userRole.roleId === 1 || user.userRole.roleId === 2) && (
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                type=""
              >
                New Project
              </button>
            )}
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
                              className="p-2"
                              onClick={() => {
                                setEditProjectId(project.projectId);
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#editModal"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>

                            <button
                              className="btn-sm gradient-custom-2 text-white"
                              onClick={() => {
                                assignUserToProject();
                                setAssignUser((prevAssignUser) => {
                                  return {
                                    ...prevAssignUser,
                                    assignToProjectId: project.projectId
                                  };
                                });
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#assignUserModal"
                            >
                              Add User
                            </button>
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
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label>Project Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(event) => {
                      handleChange(event, "name");
                    }}
                  ></input>
                </div>
                <div className="form-group mt-3">
                  <label>Project Description:</label>
                  <textarea
                    className="form-control"
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
        className="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitEdit}>
                <div className="form-group mt-3">
                  <label>Project Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={projectDetails.name}
                    onChange={(event) => {
                      handleChange(event, "name");
                    }}
                  ></input>
                </div>
                <div className="form-group mt-3">
                  <label>Project Description:</label>
                  <textarea
                    className="form-control"
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

      {/* Assign user to project modal */}
      <div
        className="modal fade"
        id="assignUserModal"
        tabindex="-1"
        aria-labelledby="assignUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="assignUserModal">
                Assign user to project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitAssignUser}>
                <div className="form-group mt-3">
                  <label>Selct user to add</label>

                  <select
                    className="form-select"
                    onChange={(event) => {
                      setAssignUser((prevAssignUser) => {
                        return {
                          ...prevAssignUser,
                          userId: event.target.value
                        };
                      });
                    }}
                  >
                    <option selected disabled hidden>
                      Choose here
                    </option>
                    {companyUsers.map((companyUser) => {
                      return <option value={companyUser.userId}>{companyUser.email}</option>;
                    })}
                  </select>
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
