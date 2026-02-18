import axios from "axios";

const baseURL = import.meta.env.MODE === "production"
  ? "https://skillsync-wi9y.onrender.com/api"
  : "http://localhost:5000/api";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
