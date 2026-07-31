import api from "../api/axios.js";

export const register = async (formData) => {
  const response = await api.post("/users/register", formData);

  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/users/logout");

  return response.data;
};

export const resetPassword = async (passwordData) => {
  const response = await api.patch("/users/reset-password", passwordData);

  return response.data;
};

export const currentUser = async () => {
  const response = await api.get("/users/current-user");

  return response.data;
};
