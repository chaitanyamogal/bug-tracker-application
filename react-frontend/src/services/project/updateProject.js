import { Axios } from "../helper/config";

export const updateProject = (projectId, projectDetails, token) => {
  return Axios.put(`api/company/projects/${projectId}`, projectDetails, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
