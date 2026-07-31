import { createContext, useContext } from "react";

export const OrderContext = createContext();

export const useOrderStore = () => useContext(OrderContext);
