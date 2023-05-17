import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { getCurrentUserDetail, getToken } from "../../auth";
import { getUsersByProject } from "../../services/userService/getUsersByProject";
import { getUsersByCompany } from "../../services/userService/getUsersByCompany";
import { assignProjectToUser } from "../../services/userService/assignProjectToUser";

const Team = (props) => {
  const token = getToken();
  const user = getCurrentUserDetail();
  const selectProjectContext = useContext(userContext);
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;

  const [teamMembers, setTeamMembers] = useState([]);
  const [allCompanyMembers, setAllCompanyMembers] = useState([]);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUsersByProject(selectProjectContext.selectedProject, token).then((data) => {
      setTeamMembers(data);
    });
  }, [selectProjectContext]);

  useEffect(() => {
    getUsersByCompany(companyId, token).then((data) => {
      setAllCompanyMembers(data);
    });
  }, [companyId, teamMembers]);

  function handleChange(event, fieldName) {
    setUserDetails((prevUserDetails) => {
      return { ...prevUserDetails, [fieldName]: event.target.value };
    });
  }

  function resetForm() {
    setUserDetails({
      name: "",
      description: ""
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    assignProjectToUser(userDetails.userId, selectProjectContext.selectedProject, token).then(
      (data) => {
        setTeamMembers((prevTeamMembers) => {
          return [...prevTeamMembers, data];
        });
      }
    );
  }
  return (
    <>
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4 shadow team-table">
          <div className="card-header d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Team</h6>
            {(user.userRole.roleId === 1 || user.userRole.roleId === 2) && (
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                data-bs-toggle="modal"
                data-bs-target="#addTeamMember"
                type=""
              >
                Add member
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
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {teamMembers.map((teamMember) => {
                    return (
                      <>
                        <tr>
                          <td>{teamMember.name}</td>
                          <td>{teamMember.email}</td>
                          <td>
                            <span className="badge text-bg-secondary">
                              {teamMember.userRole.role}
                            </span>
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

      {/* Team modal */}
      <div
        class="modal fade"
        id="addTeamMember"
        tabindex="-1"
        aria-labelledby="addTeamMember"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addTeamMember">
                Add New Team Member
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
                  <label>Select Member</label>
                  <select
                    class="form-select"
                    onChange={(event) => {
                      handleChange(event, "userId");
                    }}
                  >
                    <option selected disabled hidden>
                      Choose here
                    </option>
                    {allCompanyMembers
                      .filter((member) => !teamMembers.includes(member))
                      .map((member) => {
                        return <option value={member.userId}>{member.name}</option>;
                      })}
                  </select>
                </div>
                <div className="text-center pt-1 mb-5 pb-1 mt-3">
                  <button
                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 float-end"
                    type="submit"
                    data-dismiss="modal"
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

export default Team;
