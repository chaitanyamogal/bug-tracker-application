import { Axios } from "../helper/config";

export const adminSignup = (userData) => {
  return Axios.post("api/v1/auth/register/role/1", userData).then((response) => {
    return response.data;
  });
};
