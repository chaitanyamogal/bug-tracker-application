import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { getUserId, getToken } from "../../auth";
import { getUserById } from "../../services/userService/getUserById";
import { updateCompany } from "../../services/companyService/updateCompany";

const ManageCompany = () => {
  const userId = getUserId();
  const token = getToken();
  const selectCompanyContext = useContext(userContext);
  const companyId = JSON.parse(localStorage.getItem("data")).user.company.companyId;

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
    getUserById(userId, token).then((data) => {
      setUserDetails(data);
    });
  }, []);

  function handleEditCompanyDetailsSubmit(event) {
    event.preventDefault();
    let companyDetails = {
      companyName: userDetails.company.companyName,
      companyDescription: userDetails.company.companyDescription
    };
    updateCompany(companyId, companyDetails, token).then((data) => {
      setUserDetails((prevUserDetails) => {
        return {
          ...prevUserDetails,
          company: {
            companyName: data.companyName,
            companyDescription: data.companyDescription
          }
        };
      });

      let localData = JSON.parse(localStorage.getItem("data"));
      localData.user.company.companyName = data.companyName;
      localData.user.company.companyDescription = data.companyDescription;
      localStorage.setItem("data", JSON.stringify(localData));
      selectCompanyContext.setCompany(data.companyName);
    });
  }
  return (
    <>
      <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4 shadow">
          <div className="card-header d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Manage Company Details</h6>
            {(userDetails.userRole.roleId === 1 || userDetails.userRole.roleId === 2) && (
              <button
                className="btn mx-2 gradient-custom-2 text-white float-end m-0"
                data-bs-toggle="modal"
                data-bs-target="#editCompanyDetails"
                type=""
              >
                Edit Company Details
              </button>
            )}
          </div>

          <div className="card-body">
            <div className="form-group mt-1">
              <p>
                <b>Company Name : </b>
                {userDetails.company.companyName}
              </p>
              <p className="mt-3">
                <b>Company Description : </b>
                {userDetails.company.companyDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit company details modal */}
      <div
        className="modal fade"
        id="editCompanyDetails"
        tabindex="-1"
        aria-labelledby="editCompanyDetails"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCompanyDetails">
                Edit Company Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditCompanyDetailsSubmit}>
                <div className="form-group mt-3">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userDetails.company.companyName}
                    onChange={(event) => {
                      setUserDetails((prevUserDetails) => {
                        return {
                          ...prevUserDetails,
                          company: { ...prevUserDetails.company, companyName: event.target.value }
                        };
                      });
                    }}
                  ></input>
                </div>
                <div className="form-group mt-3">
                  <label>Company Description:</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    defaultValue={userDetails.company.companyDescription}
                    onChange={(event) => {
                      setUserDetails((prevUserDetails) => {
                        return {
                          ...prevUserDetails,
                          company: {
                            ...prevUserDetails.company,
                            companyDescription: event.target.value
                          }
                        };
                      });
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

export default ManageCompany;
