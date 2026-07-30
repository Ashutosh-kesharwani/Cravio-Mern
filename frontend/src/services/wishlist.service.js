import api from "../api/axios.js";

/* ---------------- Get Wishlist ---------------- */

export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data;
};

/* ---------------- Add To Wishlist ---------------- */

export const addToWishlist = async (foodId) => {
  const response = await api.post(`/wishlist/${foodId}`);

  return response.data;
};

/* ---------------- Remove From Wishlist ---------------- */

export const removeFromWishlist = async (foodId) => {
  const response = await api.delete(`/wishlist/${foodId}`);

  return response.data;
};
