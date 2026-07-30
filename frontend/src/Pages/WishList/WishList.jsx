import { useEffect } from "react";

import "./Wishlist.css";

import useWishlist from "../../hooks/wishlist/useWishlist";

import EmptyWishlist from "../../components/Wishlist/EmptyWishlist";
import WishlistCard from "../../components/Wishlist/WishlistCard";

const Wishlist = () => {
  const { wishlist, loading, fetchWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <section className="wishlist page">
      <div className="wishlist__container app">
        {/* ================= Header ================= */}

        <header className="wishlist__header">
          <div className="wishlist__header-content">
            <h1 className="wishlist__title">Wishlist</h1>

            <p className="wishlist__subtitle">
              Save your favorite dishes and quickly add them to your cart
              whenever you're ready.
            </p>
          </div>

          {!loading.fetchWishlist && (
            <div className="wishlist__count">
              {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
            </div>
          )}
        </header>

        {/* ================= Content ================= */}

        <main className="wishlist__content">
          {loading.fetchWishlist ? (
            <div className="wishlist__loading">Loading your wishlist...</div>
          ) : wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="wishlist__list">
              {wishlist.map((food) => (
                <WishlistCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Wishlist;
