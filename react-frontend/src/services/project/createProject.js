import { Axios } from "../helper/config";

export const createProject = (companyId, projectDetails, token) => {
  return Axios.post(`api/companies/${companyId}/projects`, projectDetails, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
