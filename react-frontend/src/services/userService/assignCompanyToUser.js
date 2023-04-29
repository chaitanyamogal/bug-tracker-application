import { Axios } from "../helper/config";

export const assignCompanyToUser = (userId, companyId, token) => {
  return Axios.get(`api/users/${userId}/companies/${companyId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
