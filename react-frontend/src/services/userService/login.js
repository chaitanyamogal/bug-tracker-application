import { Axios } from "../helper/config";

export const login = (userData) => {
  return Axios.post("/api/auth/authenticate", userData).then((response) => {
    return response.data;
  });
};
