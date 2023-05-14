import { React, useState, useEffect } from "react";
import userContext from "./userContext";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false
  });
  const [selectedProject, setSelectedProject] = useState();
  const [company, setCompany] = useState("");

  useEffect(() => {
    setUser({
      data: getCurrentUserDetail(),
      login: isLoggedIn()
    });
  }, []);

  return (
    <userContext.Provider
      value={{ user, setUser, selectedProject, setSelectedProject, company, setCompany }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
