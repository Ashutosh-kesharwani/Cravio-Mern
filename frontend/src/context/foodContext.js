import { createContext, useContext } from "react";

export const FoodContext = createContext(null);

export const useFoodStore = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw new Error("useFoodStore must be used within FoodContextProvider.");
  }

  return context;
};
