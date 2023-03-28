import { Axios } from "../helper/config";

export const getProjectsByCompanyId = (companyId, token) => {
  return Axios.get(`api/company/${companyId}/projects`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
