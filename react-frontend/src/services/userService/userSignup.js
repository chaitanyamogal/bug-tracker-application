import { Axios } from "../helper/config";

export const userSignup = (userRole, userData) => {
  return Axios.post(`api/auth/register/role/${userRole}`, userData).then((response) => {
    return response.data;
  });
};
