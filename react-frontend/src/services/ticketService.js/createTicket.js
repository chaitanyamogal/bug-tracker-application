import { Axios } from "../helper/config";

export const createTicket = (user, project, ticketDetails, token) => {
  let ticketBody = {
    ticketTitle: ticketDetails.ticketTitle,
    ticketDescription: ticketDetails.ticketDescription,
    resolutionSummary: ticketDetails.resolutionSummary
  };

  return Axios.post(
    `api/user/${user}/project/${project}/ticket-type/${ticketDetails.ticketType}/ticket-status/${ticketDetails.ticketStatus}/ticket`,
    ticketBody,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).then((response) => {
    return response.data;
  });
};
