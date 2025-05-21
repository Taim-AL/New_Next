import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8000/api",
});

Axios.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Axios;
