import { Axios } from "../helper/config";

export const getTicketStatus = (token) => {
  return Axios.get(`api/ticket-status/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
