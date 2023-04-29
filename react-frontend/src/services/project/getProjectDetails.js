import { Axios } from "../helper/config";

export const getProjectDetails = (projectId, token) => {
  return Axios.get(`api/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
