import api from "../api/axios.js";

import { ADMIN_URL } from "../constants/api.constants.js";

export const loginAdmin = async (credentials) => {
  const response = await api.post(`${ADMIN_URL}/login`, credentials);

  return response.data;
};

export const logoutAdmin = async () => {
  const response = await api.post(`${ADMIN_URL}/logout`);

  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`${ADMIN_URL}/users`);

  return response.data;
};

export const getDashboard = async () => {
  const response = await api.get(`${ADMIN_URL}/dashboard`);

  return response.data;
};
