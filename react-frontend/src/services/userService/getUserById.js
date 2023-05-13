import { Axios } from "../helper/config";

export const getUserById = (userId, token) => {
  return Axios.get(`/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
