import DashboardHeader from "./DashboardHeader";
import ManageCompany from "./ManageCompany";
import ManageProject from "./ManageProject";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <div className="row">
        <ManageCompany />
        <ManageProject />
      </div>
    </>
  );
};

export default Dashboard;
