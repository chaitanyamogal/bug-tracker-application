import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { doLogin } from "../../auth";
import { login } from "../../services/userService/login";
import { getAllProjects } from "../../services/project/getAllProjects";

const Login = () => {
  const navigate = useNavigate();
  const userContextData = useContext(userContext);
  const companyContext = useContext(userContext);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState();
  const [noProjectAssignAlert, setNoProjectAssignAlert] = useState(false);

  async function handleChange(event, fieldName) {
    await setUserDetails((data) => {
      return { ...data, [fieldName]: event.target.value };
    });
  }

  function handelSubmit(event) {
    event.preventDefault();
    //Validate data
    if (userDetails.password.length >= 4) {
      login(userDetails)
        .then((data) => {
          doLogin(data, () => {
            getAllProjects(data.user.userId, data.token).then((projectData) => {
              if (projectData.length === 0) {
                setNoProjectAssignAlert(true);
              } else {
                userContextData.setUser({
                  data: data.user,
                  login: true
                });
                companyContext.setCompany(data.user.company.companyName);
                navigate("/tickets");
              }
            });
          });
          resetForm();
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      setError("Password should be atlest 4 char");
    }
  }

  function resetForm() {
    setUserDetails({
      email: "",
      password: ""
    });
  }

  return (
    <>
      {noProjectAssignAlert && (
        <div className="alert alert-primary d-flex alert-dismissible fade show" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            You are not assign to any project. Please contact company admin or your project manager.
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setNoProjectAssignAlert(false);
            }}
          ></button>
        </div>
      )}
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={"./images/bugLogo.png"} style={{ width: "185px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">BugLog</h4>
                      </div>

                      <form onSubmit={handelSubmit}>
                        <div className="form-outline mb-2">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            value={userDetails.email}
                            onChange={(e) => handleChange(e, "email")}
                            required
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={userDetails.password}
                            onChange={(e) => handleChange(e, "password")}
                            required
                          />
                        </div>
                        <p className="text-danger">{error}</p>
                        <div className="text-center pt-1 mb-1 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <button
                            type="button"
                            class="btn btn-primary btn-block fa-lg gradient-custom-2"
                            data-bs-toggle="modal"
                            data-bs-target="#loginAsDemo"
                          >
                            Login As Demo User
                          </button>
                          <div
                            className="modal fade"
                            id="loginAsDemo"
                            tabindex="-1"
                            aria-labelledby="loginAsDemo"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="loginAsDemo">
                                    Demo users Details
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div>
                                    <h6>Role - Company Admin</h6>
                                    <p>Email - demo@gmail.com</p>
                                    <p>Password - demo123</p>
                                  </div>
                                  <div className="mt-3">
                                    <h6>Role - Project Manager</h6>
                                    <p>Email - demo1@gmail.com</p>
                                    <p>Password - demo123</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger">
                            <Link to="/signup">Signup</Link>
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <p className="">
                            <Link to="/admin-signup">Get BugLog for you'r company</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Track bugs in your project</h4>
                      <p className="small mb-0">
                        BugLog is a web-based bug tracking system designed to help software
                        development teams streamline their bug management process. With BugLog,
                        developers can easily report, track, and prioritize bugs, assign them to
                        team members, and monitor their progress until they are resolved. BugLog
                        provides a centralized platform for communication among team members,
                        enabling them to collaborate effectively and work towards a common goal. The
                        system also offers advanced reporting and analytics features to help teams
                        identify trends, track performance, and improve their development process
                        over time. Overall, BugLog is a powerful and user-friendly tool that can
                        help software development teams improve their productivity and streamline
                        their bug tracking process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
