import { Axios } from "../helper/config";

export const getUsersByCompany = (companyId, token) => {
  return Axios.get(`api/users/project/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
