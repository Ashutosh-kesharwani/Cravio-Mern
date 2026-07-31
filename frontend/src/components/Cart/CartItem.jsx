import { Trash2 } from "lucide-react";

import QuantitySelector from "./QuantitySelector";

import useCart from "../../hooks/cart/useCart";

const CartItem = ({ item }) => {
  const { loading, handleUpdateQuantity, handleRemoveItem } = useCart();

  const { food, quantity } = item;

  const handleIncrease = () => {
    handleUpdateQuantity(food._id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      handleRemoveItem(food._id);
      return;
    }

    handleUpdateQuantity(food._id, quantity - 1);
  };

  return (
    <article className="cart-item">
      {/* ================= Image ================= */}

      <div className="cart-item__image-wrapper">
        <img
          src={food.image.url}
          alt={food.name}
          className="cart-item__image"
        />
      </div>

      {/* ================= Content ================= */}

      <div className="cart-item__content">
        <div className="cart-item__top">
          <div className="cart-item__info">
            <h3 className="cart-item__title">{food.name}</h3>

            <span className="cart-item__category">{food.category}</span>
          </div>

          <div className="cart-item__price">₹{food.price.toFixed(2)}</div>
        </div>

        <p className="cart-item__description">{food.description}</p>

        <div className="cart-item__bottom">
          <QuantitySelector
            quantity={quantity}
            loading={loading.updateCart || loading.removeItem}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="cart-item__right">
            <div className="cart-item__total">
              ₹{(food.price * quantity).toFixed(2)}
            </div>

            <button
              className="cart-item__remove"
              onClick={() => handleRemoveItem(food._id)}
              disabled={loading.removeItem}
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
