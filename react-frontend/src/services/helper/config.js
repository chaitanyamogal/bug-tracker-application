import axios from "axios";
export const BASE_URL = "http://localhost:8080";

export const Axios = axios.create({
  baseURL: BASE_URL
});
