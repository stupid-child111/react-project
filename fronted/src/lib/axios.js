import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5009/api",
  withCredentials: true,//设为true是为了允许跨域请求时携带cookie
});