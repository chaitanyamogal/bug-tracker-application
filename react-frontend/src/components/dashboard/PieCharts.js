import { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { getToken } from "../../auth";
import { getProjectDetails } from "../../services/project/getProjectDetails";
import userContext from "../../context/userContext";

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
      console.log(data);
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
    console.log(ticketTypesCount);
    setTicketTypesCount(Object.values(ticketTypesCount));
    setTicketTypesKeys(Object.keys(ticketTypesCount));
    setTicketStatusCount(Object.values(ticketStatusCount));
    setTicketStatusKeys(Object.keys(ticketStatusCount));
  }, [project]);

  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Ticket Types</h6>
            </div>

            <div class="card-body">
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
        <div className="col-xl-4 col-lg-5">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Ticket Status</h6>
            </div>

            <div class="card-body">
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
