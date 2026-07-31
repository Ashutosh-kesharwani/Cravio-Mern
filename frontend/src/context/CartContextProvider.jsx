import { useMemo, useState } from "react";
import { CartContext } from "./cartContext";

const INITIAL_CART = {
  _id: null,
  userId: null,
  items: [],
};

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(INITIAL_CART);

  const [loading, setLoading] = useState({
    fetchCart: false,

    addToCart: false,
    addToCartId: null,

    updateCart: false,
    updateCartId: null,

    removeItem: false,
    removeItemId: null,

    clearCart: false,
  });

  const contextValue = useMemo(
    () => ({
      cart,
      setCart,

      loading,
      setLoading,
    }),
    [cart, loading]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export { CartContextProvider, INITIAL_CART };
