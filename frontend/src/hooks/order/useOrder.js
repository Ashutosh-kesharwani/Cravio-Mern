import { useCallback } from "react";
import toast from "react-hot-toast";

import { useOrderStore } from "../../context/orderContext.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatusById,
  verifyOrderById,
} from "../../services/order.service.js";

const useOrder = () => {
  const {
    orders,
    setOrders,
    adminOrders,
    setAdminOrders,
    loading,
    setLoading,
    INITIAL_ORDERS,
    INITIAL_ADMIN_ORDERS,
  } = useOrderStore();

  const placeOrder = useCallback(
    async (orderData) => {
      try {
        setLoading((prev) => ({
          ...prev,
          placeOrder: true,
        }));

        const response = await createOrder(orderData);

        toast.success(response.message);

        return response.data;
      } catch (error) {
        if (error.isSessionExpired) return;

        toast.error(error.response?.data?.message || "Failed to place order.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          placeOrder: false,
        }));
      }
    },
    [setLoading]
  );

  const verifyOrder = useCallback(
    async (orderId) => {
      try {
        setLoading((prev) => ({
          ...prev,
          verifyOrder: true,
        }));

        const response = await verifyOrderById(orderId);

        return response.data;
      } catch (error) {
        if (error.isSessionExpired) return;

        toast.error(error.response?.data?.message || "Failed to verify order.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          verifyOrder: false,
        }));
      }
    },
    [setLoading]
  );

  const fetchMyOrders = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        fetchOrders: true,
      }));

      const response = await getMyOrders();

      setOrders(response.data);

      return response.data;
    } catch (error) {
      if (error.isSessionExpired) return;

      toast.error(error.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetchOrders: false,
      }));
    }
  }, [setOrders, setLoading]);

  const fetchAllOrders = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        fetchAllOrders: true,
      }));

      const response = await getAllOrders();

      setAdminOrders(response.data);

      return response.data;
    } catch (error) {
      if (error.isSessionExpired) return;

      toast.error(error.response?.data?.message || "Failed to fetch orders.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetchAllOrders: false,
      }));
    }
  }, [setAdminOrders, setLoading]);

  const updateOrderStatus = useCallback(
    async (orderId, orderStatus) => {
      try {
        setLoading((prev) => ({
          ...prev,
          updateOrderStatus: true,
          updateOrderStatusId: orderId,
        }));

        const response = await updateOrderStatusById(orderId, orderStatus);

        setAdminOrders((prev) =>
          prev.map((order) => (order._id === orderId ? response.data : order))
        );

        toast.success(response.message);

        return response.data;
      } catch (error) {
        if (error.isSessionExpired) return;

        toast.error(
          error.response?.data?.message || "Failed to update order status."
        );
      } finally {
        setLoading((prev) => ({
          ...prev,
          updateOrderStatus: false,
          updateOrderStatusId: null,
        }));
      }
    },
    [setAdminOrders, setLoading]
  );

  const resetOrders = useCallback(() => {
    setOrders(INITIAL_ORDERS);
    setAdminOrders(INITIAL_ADMIN_ORDERS);
  }, [setOrders, setAdminOrders, INITIAL_ORDERS, INITIAL_ADMIN_ORDERS]);

  return {
    orders,
    adminOrders,
    loading,

    placeOrder,
    verifyOrder,
    fetchMyOrders,
    fetchAllOrders,
    updateOrderStatus,

    resetOrders,
  };
};

export default useOrder;
