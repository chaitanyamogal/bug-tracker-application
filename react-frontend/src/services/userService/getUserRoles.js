import { Axios } from "../helper/config";

export const getUserRoles = () => {
  return Axios.get(`/api/user-role/`).then((response) => {
    return response.data;
  });
};
