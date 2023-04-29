import { Axios } from "../helper/config";

export const assignProjectToUser = (userId, projectId, token) => {
  return Axios.get(`api/users/${userId}/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
