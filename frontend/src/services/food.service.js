import api from "../api/axios.js";

import { FOOD_URL } from "../constants/api.constants.js";

export const createFood = async (formData) => {
  const response = await api.post(FOOD_URL, formData);

  return response.data;
};

export const getFoods = async () => {
  const response = await api.get(FOOD_URL);

  return response.data;
};

export const deleteFood = async (foodId) => {
  const response = await api.delete(`${FOOD_URL}/${foodId}`);

  return response.data;
};
