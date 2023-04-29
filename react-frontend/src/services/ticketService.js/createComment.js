import { Axios } from "../helper/config";

export const createComment = (userId, ticketId, comment, token) => {
  return Axios.post(`api/users/${userId}/tickets/${ticketId}/comments`, comment, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
