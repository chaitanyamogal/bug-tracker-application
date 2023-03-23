import { Axios } from "./helper/config";

export const getAllProjects = (user, token) => {
  return Axios.get(`api/user/${user}/projects`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
