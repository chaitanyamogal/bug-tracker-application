import { Axios } from "../config";

export const login = (userData) => {
  return Axios.post("/api/v1/auth/authenticate", userData).then((response) => {
    return response.data;
  });
};
