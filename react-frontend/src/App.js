import AdminSignup from "./components/user/AdminSignup";
import Login from "./components/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupLayout from "./layouts/signupLayout";
import UserProvider from "./context/UserProvider";
import Tickets from "./components/ticket/Tickets";
import DashboardLayout from "./layouts/dashboardLayout";
import CreateTicket from "./components/ticket/CreateTicket";
import UpdateTicket from "./components/ticket/UpdateTicket";
import TicketDetails from "./components/ticket/TicketDetails";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./auth/PrivateRoute";
import Signup from "./components/user/Signup";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SignupLayout />}>
              <Route path="/admin-signup" element={<AdminSignup />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="tickets" element={<Tickets />}></Route>
                <Route path="new-ticket" element={<CreateTicket />}></Route>
                <Route path="/tickets/edit/:ticketId" element={<UpdateTicket />}></Route>
                <Route path="/tickets/:ticketId" element={<TicketDetails />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
