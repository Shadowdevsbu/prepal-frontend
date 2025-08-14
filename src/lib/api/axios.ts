import axios from "axios";
import { baseURL } from "./baseUrl";

const axiosApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export { axiosApi as axios };
export default axiosApi;
