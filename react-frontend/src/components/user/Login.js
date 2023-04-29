import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userService/login";
import userContext from "../../context/userContext";
import { doLogin } from "../../auth";
import { getAllProjects } from "../../services/project/getAllProjects";

const Login = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();

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
            console.log("login detail is saved to localstorage", data);
            getAllProjects(data.user.userId, data.token).then((projectData) => {
              if (projectData.length == 0) {
                setNoProjectAssignAlert(true);
              } else {
                userContextData.setUser({
                  data: data.user,
                  login: true
                });
                navigate("/tickets");
              }
            });
          });
          resetForm();
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.message);
        });
    } else {
      console.log("Password should be atlist 4 char");
      setError("Password should be atlest 4 char");
    }

    console.log(userDetails);
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
        <div class="alert alert-primary d-flex alert-dismissible fade show" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
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
            class="btn-close"
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
                        {/* <i class="bi bi-bug-fill display-1 text-danger"></i> */}
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
                        <p class="text-danger">{error}</p>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger">
                            <Link to="/signup">Signup</Link>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Track bugs in your project</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
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
