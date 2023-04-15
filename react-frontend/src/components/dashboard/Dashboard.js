import DashboardHeader from "./DashboardHeader";
import ManageProject from "./ManageProject";
import PieCharts from "./PieCharts";

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      {/* Start */}
      <div className="row">
        <ManageProject />
      </div>
      <PieCharts />
    </>
  );
};

export default Dashboard;
