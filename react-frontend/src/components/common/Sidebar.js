import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import { getToken } from "../../auth";
import { Axios } from "../../services/helper/config";
const Sidebar = (props) => {
  const [user, setUser] = useState(props.user.data.userId);
  const [projects, setProjects] = useState({});
  const token = getToken();
  useEffect(() => {
    console.log(token);
    setUser(props.user.data);
    console.log(user);
    Axios.get(`api/user/${user}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((data) => {
      console.log(data.data);
    });
  }, []);

  return (
    <div className="wrapper d-flex col-3" style={{ width: "20%" }}>
      <div className="sidebar">
        <div className="user-details-container" style={{ height: "85px", paddingLeft: "18px" }}>
          <div className="user-details">
            <p>Welcome,</p>
            <p>{props.user.data.name}</p>
            <span className="badge text-bg-primary">Admin</span>
          </div>
        </div>
        <small className="text-muted px-3">PRODUCTIVITY TOOLS</small>
        <ul>
          <li>
            <a href="#">Dashbord</a>
          </li>
          <li>
            <a href="#">Tickets</a>
          </li>
          <li>
            <select class="form-select" aria-label="Default select example">
              <option selected>Projects</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </li>
          <li>
            <a href="#">Admin</a>
          </li>
          <li>
            <a href="#">Notifications</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
