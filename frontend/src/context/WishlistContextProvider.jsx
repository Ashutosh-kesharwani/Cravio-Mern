import { useState } from "react";

import WishlistContext from "./wishlistContext.js";

const INITIAL_WISHLIST = [];
export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState({
    fetchWishlist: false,
    addToWishlist: false,
    removeFromWishlist: false,
  });

  const value = {
    wishlist,
    setWishlist,

    loading,
    setLoading,
    INITIAL_WISHLIST,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
