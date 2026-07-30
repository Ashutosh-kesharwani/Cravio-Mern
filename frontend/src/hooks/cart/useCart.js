import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../../services/cart.service.js";

import { INITIAL_CART } from "../../context/CartContextProvider.jsx";
import { useCartStore } from "../../context/cartContext.js";

const DELIVERY_FEE = 40;

const useCart = () => {
  const { cart, setCart, loading, setLoading } = useCartStore();

  const fetchCart = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        fetchCart: true,
      }));

      const response = await getCart();

      setCart(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setCart(INITIAL_CART);
        return;
      }

      toast.error(error.response?.data?.message || "Failed to fetch cart.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetchCart: false,
      }));
    }
  }, [setCart, setLoading]);

  const getCartItem = useCallback(
    (foodId) => {
      return cart.items.find((item) => item.food._id === foodId);
    },
    [cart]
  );

  const handleAddToCart = useCallback(
    async (foodId) => {
      try {
        setLoading((prev) => ({
          ...prev,
          addToCart: true,
          addToCartId: foodId,
        }));

        const response = await addToCart(foodId);

        setCart(response.data);

        toast.success(response.message);
      } catch (error) {
        if (error.isSessionExpired) {
          return;
        }

        toast.error(error.response?.data?.message || "Failed to add item.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          addToCart: false,
          addToCartId: null,
        }));
      }
    },
    [setCart, setLoading]
  );

  const handleUpdateQuantity = useCallback(
    async (foodId, quantity) => {
      try {
        setLoading((prev) => ({
          ...prev,
          updateCart: true,
          updateCartId: foodId,
        }));

        const response = await updateCartItem(foodId, quantity);

        setCart(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update cart.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          updateCart: false,
          updateCartId: null,
        }));
      }
    },
    [setCart, setLoading]
  );

  const handleRemoveItem = useCallback(
    async (foodId) => {
      try {
        setLoading((prev) => ({
          ...prev,
          removeItem: true,
          removeItemId: foodId,
        }));

        const response = await removeFromCart(foodId);

        setCart(response.data);

        toast.success(response.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to remove item.");
      } finally {
        setLoading((prev) => ({
          ...prev,
          removeItem: false,
          removeItemId: null,
        }));
      }
    },
    [setCart, setLoading]
  );
  const handleClearCart = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        clearCart: true,
      }));

      const response = await clearCart();

      setCart(response.data);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        clearCart: false,
      }));
    }
  }, [setCart, setLoading]);

  const resetCart = useCallback(() => {
    setCart(INITIAL_CART);
  }, [setCart]);

  const totalItems = useMemo(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.items.reduce(
      (total, item) => total + item.food.price * item.quantity,
      0
    );
  }, [cart]);

  const deliveryFee = useMemo(() => {
    return cart.items.length ? DELIVERY_FEE : 0;
  }, [cart]);

  const grandTotal = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  return {
    cart,
    loading,

    fetchCart,

    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,

    resetCart,

    totalItems,
    subtotal,
    deliveryFee,
    grandTotal,
    getCartItem,
  };
};

export default useCart;
