import { useContext } from "react";
import { Outlet } from "react-router-dom";
import userContext from "../context/userContext";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {
  const userContextData = useContext(userContext);
  return (
    <>
      <Navbar />
      <div style={{ height: "92vh" }}>
        <div className="row" style={{ margin: "0", height: "100%" }}>
          <Sidebar user={userContextData.user} />
          <div className="col-10 content-container" style={{ height: "100%", overflow: "scroll" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
