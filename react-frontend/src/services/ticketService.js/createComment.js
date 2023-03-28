import { Axios } from "../helper/config";

export const createComment = (userId, ticketId, comment, token) => {
  return Axios.post(`api/user/${userId}/ticket/${ticketId}/comments`, comment, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
