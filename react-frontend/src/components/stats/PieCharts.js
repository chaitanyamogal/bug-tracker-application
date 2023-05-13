import Chart from "react-apexcharts";
import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { getToken } from "../../auth";
import { getProjectDetails } from "../../services/project/getProjectDetails";

const PieCharts = () => {
  const token = getToken();
  const selectProjectContext = useContext(userContext);

  const [project, setProject] = useState({ tickets: [] });
  const [ticketTypesCount, setTicketTypesCount] = useState([]);
  const [ticketTypeKeys, setTicketTypesKeys] = useState([]);
  const [tickeStatusCount, setTicketStatusCount] = useState([]);
  const [ticketStatusKeys, setTicketStatusKeys] = useState([]);

  useEffect(() => {
    getProjectDetails(selectProjectContext.selectedProject, token).then(async (data) => {
      await setProject(data);
    });
  }, [selectProjectContext]);

  useEffect(() => {
    const ticketTypesCount = project.tickets.reduce(
      (acc, cur) =>
        Object.assign(acc, {
          [cur.ticketType.type]: (acc[cur.ticketType.type] || 0) + 1
        }),
      {}
    );

    const ticketStatusCount = project.tickets.reduce(
      (acc, cur) =>
        Object.assign(acc, {
          [cur.ticketStatus.status]: (acc[cur.ticketStatus.status] || 0) + 1
        }),
      {}
    );
    setTicketTypesCount(Object.values(ticketTypesCount));
    setTicketTypesKeys(Object.keys(ticketTypesCount));
    setTicketStatusCount(Object.values(ticketStatusCount));
    setTicketStatusKeys(Object.keys(ticketStatusCount));
  }, [project]);

  return (
    <>
      <div className="mt-4 ms-1">
        <h1 className="h3 mb-2 text-gray-800">Ticket Tables</h1>
        <p className="mb-4">
          All tickets for this project are listed below. To change project select project from
          sidebar.
        </p>
      </div>
      <div className="row mt-5">
        <div className=" col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Ticket Types</h6>
            </div>

            <div className="card-body">
              <Chart
                type="pie"
                //series={[25, 25, 25, 25]}
                series={ticketTypesCount}
                options={{
                  // title: { text: "Student PieChart" },
                  noData: { text: "Empty Data" },
                  // colors:["#f90000","#f0f"],
                  //labels: ["Feature", "Task", "Bug", "In Testing"]
                  labels: ticketTypeKeys
                }}
              ></Chart>
            </div>
          </div>
        </div>

        {/* Second Chart */}
        <div className=" col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Ticket Status</h6>
            </div>

            <div className="card-body">
              <Chart
                type="pie"
                series={tickeStatusCount}
                options={{
                  // title: { text: "Student PieChart" },
                  noData: { text: "Empty Data" },
                  // colors:["#f90000","#f0f"],
                  labels: ticketStatusKeys
                }}
              ></Chart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PieCharts;
