import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "http://localhost:5251/api",
});

// Request Interceptor for JWT
axiosRequest.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
axiosRequest.interceptors.response.use(
  (response) => response.data, // Automatically return response.data
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
export default axiosRequest;
