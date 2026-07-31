import "./FoodCard.css";

import { Clock3, Heart, Plus, Star } from "lucide-react";

import useCart from "../../hooks/cart/useCart";
import useWishlist from "../../hooks/wishlist/useWishlist";

import { QuantitySelector } from "../Cart";

const FoodCard = ({ food }) => {
  /* ===========================
     Cart
  =========================== */

  const {
    loading,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    getCartItem,
  } = useCart();

  /* ===========================
     Wishlist
  =========================== */

  const {
    loading: wishlistLoading,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isWishlisted,
  } = useWishlist();

  /* ===========================
     Data
  =========================== */

  const cartItem = getCartItem(food._id);

  const quantity = cartItem?.quantity ?? 0;

  const wished = isWishlisted(food._id);

  const isAdding = loading.addToCart && loading.addToCartId === food._id;

  const isUpdating = loading.updateCart && loading.updateCartId === food._id;

  const isRemoving = loading.removeItem && loading.removeItemId === food._id;

  return (
    <article className="food-card">
      <div className="food-card__image-wrapper">
        <img
          src={food.image?.url}
          alt={food.name}
          className="food-card__image"
        />

        <button
          className={`food-card__wishlist ${
            wished ? "food-card__wishlist--active" : ""
          }`}
          disabled={
            wishlistLoading.addToWishlist || wishlistLoading.removeFromWishlist
          }
          onClick={() => {
            if (wished) {
              handleRemoveFromWishlist(food._id);
            } else {
              handleAddToWishlist(food._id);
            }
          }}
        >
          <Heart size={20} fill={wished ? "currentColor" : "none"} />
        </button>

        <div className="food-card__rating">
          <Star size={14} fill="currentColor" />
          4.8
        </div>
      </div>

      <div className="food-card__body">
        <div className="food-card__top">
          <h3>{food.name}</h3>

          <span>₹{food.price}</span>
        </div>

        <p className="food-card-description">{food.description}</p>

        <div className="food-card__meta">
          <span>{food.category}</span>

          <span>
            <Clock3 size={15} />
            15 min
          </span>
        </div>

        {quantity === 0 ? (
          <button
            className="food-card__button"
            onClick={() => handleAddToCart(food._id)}
            disabled={isAdding}
          >
            <Plus size={18} />

            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        ) : (
          <QuantitySelector
            quantity={quantity}
            loading={isUpdating || isRemoving}
            onIncrease={() => handleUpdateQuantity(food._id, quantity + 1)}
            onDecrease={() => {
              if (quantity === 1) {
                handleRemoveItem(food._id);
              } else {
                handleUpdateQuantity(food._id, quantity - 1);
              }
            }}
          />
        )}
      </div>
    </article>
  );
};

export default FoodCard;
