import api from "../api/axios.js";

/* ---------------- Register ---------------- */

export const register = async (formData) => {
  const response = await api.post("/users/register", formData);

  return response.data;
};

/* ---------------- Login ---------------- */

export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

/* ---------------- Logout ---------------- */

export const logout = async () => {
  const response = await api.post("/users/logout");

  return response.data;
};

/* ---------------- Reset Password ---------------- */

export const resetPassword = async (passwordData) => {
  const response = await api.patch("/users/reset-password", passwordData);

  return response.data;
};

/* ---------------- Current User ---------------- */

export const currentUser = async () => {
  const response = await api.get("/users/current-user");

  return response.data;
};
