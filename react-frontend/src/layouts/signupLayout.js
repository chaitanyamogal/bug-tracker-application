import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const SignupLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default SignupLayout;
