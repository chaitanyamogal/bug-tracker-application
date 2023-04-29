import { Axios } from "../helper/config";

export const getCompanies = () => {
  return Axios.get(`/api/companies`).then((response) => {
    return response.data;
  });
};
