import axios from "axios";
import {
  API_BASE_URL,
  REFRESH_ACCESS_TOKEN_URL,
} from "../constants/api.constants.js";

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
      originalRequest.url !== REFRESH_ACCESS_TOKEN_URL
    ) {
      originalRequest._retry = true;

      try {
        await api.post(REFRESH_ACCESS_TOKEN_URL);

        return api(originalRequest);
      } catch (refreshError) {
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
