import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userService/login";
import userContext from "../../context/userContext";
import { doLogin } from "../../auth";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });

  const userContextData = useContext(userContext);
  const navigate = useNavigate();

  const [error, setError] = useState();

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
            console.log("login detail is saved to localstorage");
            userContextData.setUser({
              data: data.user,
              login: true
            });
            navigate("/tickets");
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
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
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
                      <h4 className="mb-4">We are more than just a company</h4>
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
