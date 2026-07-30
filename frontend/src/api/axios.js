import axios from "axios";
import {
  API_BASE_URL,
  REFRESH_ACCESS_TOKEN_URL,
} from "../constants/api.constants.js";
import { AUTH_EXCLUDED_ROUTES } from "../constants/auth.constants.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response.status === 401;
    const isRetry = originalRequest._retry;

    const isExcludedRoute = AUTH_EXCLUDED_ROUTES.some((route) =>
      originalRequest.url.includes(route)
    );

    if (!isUnauthorized || isRetry || isExcludedRoute) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await api.post(REFRESH_ACCESS_TOKEN_URL);

      return api(originalRequest);
    } catch (refreshError) {
      refreshError.isSessionExpired = true;

      window.dispatchEvent(new Event("auth:logout"));

      return Promise.reject(refreshError);
    }
  }
);

export default api;
