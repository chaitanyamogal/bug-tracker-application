import { Axios } from "../helper/config";

export const getUsersByProject = (projectId, token) => {
  return Axios.get(`api/users/project/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
