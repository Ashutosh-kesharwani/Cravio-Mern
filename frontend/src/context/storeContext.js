import { createContext, useContext } from "react";

// Store Context Space
export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};
