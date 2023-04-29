import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import { doLogin } from "../../auth";
import { getUserRoles } from "../../services/userService/getUserRoles";
import { getCompanies } from "../../services/userService/getCompanies";
import { userSignup } from "../../services/userService/userSignup";
import { assignCompanyToUser } from "../../services/userService/assignCompanyToUser";

const Signup = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "",
    userCompany: ""
  });
  const [error, setError] = useState();
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getUserRoles().then((data) => {
      setRoles(data);
    });
    getCompanies().then((data) => {
      setCompanies(data);
    });
  }, []);

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
        userSignup(userDetails.userRole, {
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password
        })
          .then((data) => {
            doLogin(data, () => {
              assignCompanyToUser(data.user.userId, userDetails.userCompany, data.token).then(
                (companyData) => {
                  console.log("UserDetails", userDetails);
                  console.log("Company assigned ", companyData);
                  console.log("login detail is saved to localstorage", data);
                  userContextData.setUser({
                    data: data.user,
                    login: true
                  });
                  navigate("/login");
                }
              );
            });
            resetForm();
          })
          .catch((err) => {
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
                        {/* <i class="bi bi-bug-fill display-1 text-danger"></i> */}
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
                          <label className="form-label">Role</label>
                          <select
                            class="form-select"
                            value={userDetails.userRole}
                            onChange={(event) => {
                              handleChange(event, "userRole");
                            }}
                          >
                            <option selected disabled hidden>
                              Choose here
                            </option>
                            {roles.map((role) => {
                              return <option value={role.roleId}>{role.role}</option>;
                            })}
                          </select>
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label">Company</label>
                          <select
                            class="form-select"
                            value={userDetails.userCompany}
                            onChange={(event) => {
                              handleChange(event, "userCompany");
                            }}
                          >
                            <option selected disabled hidden>
                              Choose here
                            </option>
                            {companies.map((company) => {
                              return (
                                <option value={company.companyId}>{company.companyName}</option>
                              );
                            })}
                          </select>
                        </div>
                        <p class="text-danger">{error}</p>
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

export default Signup;
