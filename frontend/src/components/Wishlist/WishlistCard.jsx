import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useCart from "../../hooks/cart/useCart";
import useWishlist from "../../hooks/wishlist/useWishlist";

const WishlistCard = ({ food }) => {
  const navigate = useNavigate();

  const { handleAddToCart } = useCart();

  const { loading, handleRemoveFromWishlist } = useWishlist();

  const handleMoveToCart = async () => {
    await handleAddToCart(food._id);

    await handleRemoveFromWishlist(food._id);
  };

  return (
    <article className="wishlist-card">
      {/* Image */}

      <div className="wishlist-card__image-wrapper">
        <img
          src={food.image?.url}
          alt={food.name}
          className="wishlist-card__image"
          onClick={() => navigate(`/food/${food._id}`)}
        />

        <button
          className="wishlist-card__wishlist-btn"
          onClick={() => handleRemoveFromWishlist(food._id)}
          disabled={loading.removeFromWishlist}
          aria-label="Remove from wishlist"
        >
          <Heart size={18} fill="currentColor" />
        </button>
      </div>

      {/* Content */}

      <div className="wishlist-card__content">
        <div className="wishlist-card__top">
          <div className="wishlist-card__info">
            <h2 className="wishlist-card__title">{food.name}</h2>

            <span className="wishlist-card__category">{food.category}</span>
          </div>

          <div className="wishlist-card__price">₹{food.price}</div>
        </div>

        <p className="wishlist-card__description">{food.description}</p>

        <div className="wishlist-card__bottom">
          <button
            className="wishlist-card__cart-btn"
            onClick={handleMoveToCart}
          >
            <ShoppingCart size={18} />

            <span>Add to Cart</span>
          </button>

          <button
            className="wishlist-card__remove-btn"
            onClick={() => handleRemoveFromWishlist(food._id)}
            disabled={loading.removeFromWishlist}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default WishlistCard;
