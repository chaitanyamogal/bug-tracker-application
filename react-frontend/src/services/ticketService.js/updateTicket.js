import { Axios } from "../helper/config";

export const updateTicket = (ticketId, ticketDetails, token) => {
  let ticketBody = {
    ticketTitle: ticketDetails.ticketTitle,
    ticketDescription: ticketDetails.ticketDescription,
    resolutionSummary: ticketDetails.resolutionSummary
  };

  return Axios.put(
    `api/ticket-type/${ticketDetails.ticketType}/ticket-status/${ticketDetails.ticketStatus}/tickets/${ticketId}`,
    ticketBody,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  ).then((response) => {
    return response.data;
  });
};
