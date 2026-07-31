import { useCallback, useContext } from "react";

import toast from "react-hot-toast";

import WishlistContext from "../../context/WishlistContext";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlist.service";

const useWishlist = () => {
  const { wishlist, setWishlist, loading, setLoading, INITIAL_WISHLIST } =
    useContext(WishlistContext);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        fetchWishlist: true,
      }));

      const response = await getWishlist();

      setWishlist(response.data.wishlist);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch wishlist.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetchWishlist: false,
      }));
    }
  }, [setLoading, setWishlist]);

  const handleAddToWishlist = async (foodId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        addToWishlist: true,
      }));

      const response = await addToWishlist(foodId);

      setWishlist(response.data.wishlist);

      toast.success(response.message);
    } catch (error) {
      if (error.isSessionExpired) {
        return;
      }

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        addToWishlist: false,
      }));
    }
  };

  const handleRemoveFromWishlist = async (foodId) => {
    try {
      setLoading((prev) => ({
        ...prev,
        removeFromWishlist: true,
      }));

      const response = await removeFromWishlist(foodId);

      setWishlist(response.data.wishlist);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading((prev) => ({
        ...prev,
        removeFromWishlist: false,
      }));
    }
  };

  const resetWishlist = useCallback(() => {
    setWishlist(INITIAL_WISHLIST);
  }, [setWishlist]);

  const isWishlisted = (foodId) => {
    return wishlist.some((food) => food._id === foodId);
  };

  const getWishlistItem = (foodId) => {
    return wishlist.find((food) => food._id === foodId);
  };

  return {
    wishlist,
    loading,

    fetchWishlist,

    handleAddToWishlist,
    handleRemoveFromWishlist,

    isWishlisted,
    getWishlistItem,
    resetWishlist,
  };
};

export default useWishlist;
