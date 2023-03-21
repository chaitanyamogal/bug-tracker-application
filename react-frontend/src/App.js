import Navbar from "./components/common/Navbar";
import Project from "./core/Project";
import Sidebar from "./components/common/Sidebar";
import AdminSignup from "./components/user/AdminSignup";
import Login from "./components/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupLayout from "./layouts/signupLayout";
import UserProvider from "./context/UserProvider";
import Home from "./components/Home";
import DashboardLayout from "./layouts/dashboardLayout";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SignupLayout />}>
              <Route path="/signup" element={<AdminSignup />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/" element={<DashboardLayout />}>
              <Route path="home" element={<Home />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
