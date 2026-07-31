import api from "../api/axios.js";

export const updateProfile = async (payload) => {
  const response = await api.patch("/users/profile", payload);

  return response.data;
};

export const changePassword = async (payload) => {
  const response = await api.patch("/users/change-password", payload);

  return response.data;
};

export const changeEmail = async (payload) => {
  const response = await api.patch("/users/change-email", payload);

  return response.data;
};

export const changeUsername = async (payload) => {
  const response = await api.patch("/users/me", payload);

  return response.data;
};

export const updateContactNumber = async (payload) => {
  const response = await api.patch("/users/contact-number", payload);

  return response.data;
};

export const uploadAvatar = async (avatarFile) => {
  const formData = new FormData();

  formData.append("avatar", avatarFile);

  const response = await api.post("/users/avatar", formData);

  return response.data;
};

export const changeAvatar = async (avatarFile) => {
  const formData = new FormData();

  formData.append("avatar", avatarFile);

  const response = await api.patch("/users/avatar", formData);

  return response.data;
};

export const deleteAvatar = async () => {
  const response = await api.delete("/users/avatar");

  return response.data;
};

export const addAddress = async (payload) => {
  const response = await api.post("/users/address", {
    address: payload,
  });

  return response.data;
};

export const updateAddress = async (addressId, payload) => {
  const response = await api.patch(`/users/address/${addressId}`, {
    address: payload,
  });

  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/users/address/${addressId}`);

  return response.data;
};
