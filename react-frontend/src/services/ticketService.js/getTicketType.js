import { Axios } from "../helper/config";

export const getTicketTypes = (token) => {
  return Axios.get(`api/ticket-type/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
