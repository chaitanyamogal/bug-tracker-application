import { Axios } from "../helper/config";

export const createCompany = (companyDetails) => {
  return Axios.post(`api/companies`, companyDetails).then((response) => {
    return response.data;
  });
};
