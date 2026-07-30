import { useState } from "react";

import { OrderContext } from "./orderContext.js";

const INITIAL_ORDERS = [];
const INITIAL_ADMIN_ORDERS = [];

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [adminOrders, setAdminOrders] = useState(INITIAL_ADMIN_ORDERS);

  const [loading, setLoading] = useState({
    placeOrder: false,
    verifyOrder: false,

    fetchOrders: false,
    fetchAllOrders: false,

    updateOrderStatus: false,
    updateOrderStatusId: null,
  });

  const value = {
    orders,
    setOrders,

    adminOrders,
    setAdminOrders,

    loading,
    setLoading,

    INITIAL_ORDERS,
    INITIAL_ADMIN_ORDERS,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
