import { Axios } from "../helper/config";

export const assignProjectToUser = (userId, projectId, token) => {
  return Axios.get(`api/users/${userId}/project/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
