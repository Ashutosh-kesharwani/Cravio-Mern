import axios from "axios";
import { API_BASE_URL } from "../config/constants.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/users/refresh-token"
    ) {
      originalRequest._retry = true;

      try {
        // Generate new Access Token
        await api.post("/users/refresh-token");

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh Token also expired
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
