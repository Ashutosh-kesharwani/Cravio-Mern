import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { navigateToSection } from "../../utils/navigation";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <section className="empty-cart">
      <div className="empty-cart__icon">
        <ShoppingCart size={70} />
      </div>

      <h2>Your Cart is Empty</h2>

      <p>
        Looks like you haven't added any delicious food yet. Explore our menu
        and start your order.
      </p>

      <button
        className="empty-cart__button"
        onClick={() => navigateToSection("explore-menu", location, navigate)}
      >
        Browse Menu
      </button>
    </section>
  );
};

export default EmptyCart;
