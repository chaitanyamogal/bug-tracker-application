import { Axios } from "../helper/config";

export const getUsersByProject = (projectId, token) => {
  return Axios.get(`api/users/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
