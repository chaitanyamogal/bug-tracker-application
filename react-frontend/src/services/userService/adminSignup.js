import { Axios } from "../helper/config";

export const adminSignup = (userData) => {
  return Axios.post("api/auth/register/role/1", userData).then((response) => {
    return response.data;
  });
};
