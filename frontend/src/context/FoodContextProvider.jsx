import { useState } from "react";

import { FoodContext } from "./foodContext.js";

const INITIAL_FOOD_STATE = [];

export const FoodContextProvider = ({ children }) => {
  const [foods, setFoods] = useState(INITIAL_FOOD_STATE);

  const [loading, setLoading] = useState({
    fetchFoods: false,
    createFood: false,
    updateFood: false,
    deleteFood: false,
  });

  const resetFoods = () => {
    setFoods([]);
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        setFoods,

        loading,
        setLoading,

        resetFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
