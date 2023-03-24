import { Axios } from "../helper/config";

export const getTicketById = (ticketId, token) => {
  return Axios.get(`api/ticket/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
