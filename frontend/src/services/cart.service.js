import api from "../api/axios.js";

import { CART_URL } from "../constants/api.constants.js";

export const getCart = async () => {
  const response = await api.get(CART_URL);

  return response.data;
};

export const addToCart = async (foodId) => {
  const response = await api.post(CART_URL, {
    foodId,
  });

  return response.data;
};

export const updateCartItem = async (foodId, quantity) => {
  const response = await api.patch(`${CART_URL}/${foodId}`, {
    quantity,
  });

  return response.data;
};

export const removeFromCart = async (foodId) => {
  const response = await api.delete(`${CART_URL}/${foodId}`);

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete(CART_URL);

  return response.data;
};
