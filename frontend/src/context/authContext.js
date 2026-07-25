import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuthStore = () => {
  return useContext(AuthContext);
};
