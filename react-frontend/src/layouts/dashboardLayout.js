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
      <div class="">
        <div class="row">
          <Sidebar user={userContextData.user} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
