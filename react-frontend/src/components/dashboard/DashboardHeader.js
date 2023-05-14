import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { getToken, getUserId } from "../../auth";
import { getProjectDetails } from "../../services/project/getProjectDetails";

const DashboardHeader = () => {
  const token = getToken();
  const userId = getUserId();
  const selectProjectContext = useContext(userContext);

  const [project, setProject] = useState({ tickets: [] });
  const [totalTickets, setTotalTickets] = useState(0);
  const [yourTickets, setYourTickets] = useState(0);

  useEffect(() => {
    getProjectDetails(selectProjectContext.selectedProject, token).then((data) => {
      setProject(data);
    });
  }, [selectProjectContext]);

  useEffect(() => {
    setTotalTickets(project.tickets.length);
    setYourTickets(
      project.tickets.filter((ticket) => ticket.createdByUserId.userId == userId).length
    );
  }, [project]);

  return (
    <>
      {/* start Header */}
      <div className="mb-4">
        <h1 className="h3 mb-2 text-gray-800 mt-4">Dashboard</h1>
        <p className="mb-4">Manage company and projects.</p>
      </div>

      {/* end Header */}

      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4 ">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    TOTAL Tickets
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{totalTickets}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    YOUR TICKETS
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{yourTickets}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Tasks
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
