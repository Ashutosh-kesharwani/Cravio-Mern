import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { navigateToSection } from "../../utils/navigation.js";
const EmptyWishlist = () => {
  const navigate = useNavigate();
  return (
    <section className="empty-wishlist">
      <div className="empty-wishlist__icon">
        <Heart size={64} />
      </div>

      <h2>Your Wishlist is Empty</h2>

      <p>
        Save your favorite dishes to your wishlist and order them anytime with
        just one click.
      </p>

      <button
        className="empty-wishlist__button"
        onClick={() => navigateToSection("explore-menu", location, navigate)}
      >
        Browse Menu
      </button>
    </section>
  );
};

export default EmptyWishlist;
