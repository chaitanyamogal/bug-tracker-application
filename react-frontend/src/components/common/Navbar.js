import { useNavigate } from "react-router-dom";
import { doLogout, isLoggedIn } from "../../auth";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand navbar-light bg-white topbar static-top shadow"
      // style={{ backgroundColor: "#e3f2fd" }}
    >
      <div class="container-fluid">
        <button
          class="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">
          Navbar
        </a>
        <div class="ml-auto form-inline">
          {!isLoggedIn() && (
            <button
              class="btn-sm my-2 mx-1 gradient-custom-2 text-white"
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          )}
          {!isLoggedIn() && (
            <button
              class="btn-sm my-2 mx-1 gradient-custom-2 text-white"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {isLoggedIn() && (
            <button
              class="btn-sm my-2 mx-1 gradient-custom-2 text-white"
              type="button"
              onClick={() => {
                navigate("/login");
                doLogout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
