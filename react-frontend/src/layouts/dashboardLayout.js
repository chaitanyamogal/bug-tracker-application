import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import userContext from "../context/userContext";
import { useContext } from "react";

const DashboardLayout = () => {
  const userContextData = useContext(userContext);
  return (
    <>
      <Navbar />
      <div>
        <div className="row" style={{ margin: "0" }}>
          <Sidebar user={userContextData.user} />
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
