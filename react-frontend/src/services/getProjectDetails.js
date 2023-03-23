import { Axios } from "./helper/config";

export const getProjectDetails = (projectId, token) => {
  return Axios.get(`api/company/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
