import { Axios } from "../helper/config";

export const updateCompany = (companyId, companyDetails, token) => {
  return Axios.put(`api/companies/${companyId}`, companyDetails, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    return response.data;
  });
};
