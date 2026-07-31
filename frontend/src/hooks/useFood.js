import { useCallback } from "react";
import toast from "react-hot-toast";

import { useFoodStore } from "../context/foodContext.js";

import { createFood, deleteFood, getFoods } from "../services/food.service.js";

const useFood = () => {
  const { foods, setFoods, loading, setLoading, resetFoods } = useFoodStore();

  const fetchFoods = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        fetchFoods: true,
      }));

      const response = await getFoods();
      setFoods(response.data);

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch food items."
      );

      throw error;
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetchFoods: false,
      }));
    }
  }, [setFoods, setLoading]);

  const handleCreateFood = useCallback(
    async (formData) => {
      try {
        setLoading((prev) => ({
          ...prev,
          createFood: true,
        }));

        const response = await createFood(formData);

        setFoods((prev) => [...prev, response.data]);

        toast.success(response.message);

        return response;
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to create food.");

        throw error;
      } finally {
        setLoading((prev) => ({
          ...prev,
          createFood: false,
        }));
      }
    },
    [setFoods, setLoading]
  );

  const handleDeleteFood = useCallback(
    async (foodId) => {
      try {
        setLoading((prev) => ({
          ...prev,
          deleteFood: true,
        }));

        const response = await deleteFood(foodId);

        setFoods((prev) => prev.filter((food) => food._id !== foodId));

        toast.success(response.message);

        return response;
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete food.");

        throw error;
      } finally {
        setLoading((prev) => ({
          ...prev,
          deleteFood: false,
        }));
      }
    },
    [setFoods, setLoading]
  );

  return {
    foods,

    loading,

    fetchFoods,

    handleCreateFood,

    handleDeleteFood,

    resetFoods,
  };
};

export default useFood;
