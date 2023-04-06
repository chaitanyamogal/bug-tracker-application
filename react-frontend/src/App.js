import Navbar from "./components/common/Navbar";
import Project from "./core/Project";
import Sidebar from "./components/common/Sidebar";
import AdminSignup from "./components/user/AdminSignup";
import Login from "./components/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupLayout from "./layouts/signupLayout";
import UserProvider from "./context/UserProvider";
import Tickets from "./components/Tickets";
import DashboardLayout from "./layouts/dashboardLayout";
import CreateTicket from "./components/ticket/CreateTicket";
import UpdateTicket from "./components/ticket/UpdateTicket";
import TicketDetails from "./components/ticket/TicketDetails";
import ManageProject from "./components/project/ManageProjects";
import PrivateRoute from "./auth/PrivateRoute";

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
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="tickets" element={<Tickets />}></Route>
                <Route path="new-ticket" element={<CreateTicket />}></Route>
                <Route path="tickets/:ticketId" element={<TicketDetails />}></Route>
                <Route path="tickets/edit/:ticketId" element={<UpdateTicket />}></Route>
                <Route path="dashboard" element={<ManageProject />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
