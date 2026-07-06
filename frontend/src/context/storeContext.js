import { createContext, useContext } from "react";

// Store Context Space
export const StoreContext = createContext();

// useStore -> customHook
export const useFoodList = () => {
  return useContext(StoreContext);
};

export const useCartItem = () => {
  return useContext(StoreContext);
};
