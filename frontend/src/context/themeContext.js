import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

export const useThemeStore = () => {
  return useContext(ThemeContext);
};
