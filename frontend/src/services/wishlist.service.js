import api from "../api/axios.js";

export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data;
};

export const addToWishlist = async (foodId) => {
  const response = await api.post(`/wishlist/${foodId}`);

  return response.data;
};

export const removeFromWishlist = async (foodId) => {
  const response = await api.delete(`/wishlist/${foodId}`);

  return response.data;
};
