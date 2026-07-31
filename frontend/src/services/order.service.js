import api from "../api/axios.js";

import { ORDER_URL } from "../constants/api.constants.js";

// Create Order
export const createOrder = async (orderData) => {
  const response = await api.post(ORDER_URL, orderData);

  return response.data;
};

// Verify Order
export const verifyOrderById = async (orderId) => {
  const response = await api.get(`${ORDER_URL}/verify?orderId=${orderId}`);

  return response.data;
};

// My Orders
export const getMyOrders = async () => {
  const response = await api.get(`${ORDER_URL}/my-orders`);

  return response.data;
};

// Admin - Get All Orders
export const getAllOrders = async () => {
  const response = await api.get(ORDER_URL);

  return response.data;
};

// Admin - Update Order Status
export const updateOrderStatusById = async (orderId, orderStatus) => {
  const response = await api.patch(`${ORDER_URL}/${orderId}/status`, {
    orderStatus,
  });

  return response.data;
};
