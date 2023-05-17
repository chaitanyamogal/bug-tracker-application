import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { doLogin } from "../../auth";
import { adminSignup } from "../../services/userService/adminSignup";
import { createCompany } from "../../services/companyService/createCompany";
import { assignCompanyToUser } from "../../services/userService/assignCompanyToUser";

const AdminSignup = () => {
  const navigate = useNavigate();
  const userContextData = useContext(userContext);

  const [error, setError] = useState();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyDescription: ""
  });

  async function handleChange(event, fieldName) {
    await setUserDetails((data) => {
      return { ...data, [fieldName]: event.target.value };
    });
  }

  function handelSubmit(event) {
    event.preventDefault();
    //Validate data
    if (userDetails.password.length >= 4) {
      if (userDetails.password === userDetails.confirmPassword) {
        adminSignup({
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password
        })
          .then(async (data) => {
            await createCompany(companyDetails).then((companyData) => {
              doLogin(data, () => {
                assignCompanyToUser(data.user.userId, companyData.companyId, data.token).then(
                  () => {
                    userContextData.setUser({
                      data: data.user,
                      login: true
                    });
                    navigate("/login");
                  }
                );
              });
              resetForm();
            });
          })
          .catch((err) => {
            console.log("ADMIN.js 58 --> ", err);
            setError(err.response.data.message);
          });
      } else {
        setError("Password and conform password don't match");
      }
    } else {
      setError("Password should be atlest 4 char");
    }
  }

  function resetForm() {
    setUserDetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <>
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
                          <label className="form-label">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={userDetails.name}
                            onChange={(e) => handleChange(e, "name")}
                            required
                          />
                        </div>
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
                        <div className="form-outline mb-2">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={userDetails.confirmPassword}
                            onChange={(e) => handleChange(e, "confirmPassword")}
                            required
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={companyDetails.companyName}
                            onChange={(e) =>
                              setCompanyDetails((prevDetails) => {
                                return { ...prevDetails, companyName: e.target.value };
                              })
                            }
                            required
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label">Company Description</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={companyDetails.companyDescription}
                            onChange={(e) =>
                              setCompanyDetails((prevDetails) => {
                                return { ...prevDetails, companyDescription: e.target.value };
                              })
                            }
                            required
                          />
                        </div>
                        <p className="text-danger">{error}</p>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Signup
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <button type="button" className="btn btn-outline-danger">
                            <Link to="/login">Login</Link>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
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

export default AdminSignup;
