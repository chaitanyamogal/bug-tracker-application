import { Axios } from "../helper/config";

export const createTicket = (user, project, ticketDetails, token) => {
  let ticketBody = {
    ticketTitle: ticketDetails.ticketTitle,
    ticketDescription: ticketDetails.ticketDescription,
    resolutionSummary: ticketDetails.resolutionSummary
  };

  return Axios.post(
    `api/users/${user}/projects/${project}/ticket-type/${ticketDetails.ticketType}/ticket-status/${ticketDetails.ticketStatus}/tickets`,
    ticketBody,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).then((response) => {
    return response.data;
  });
};
