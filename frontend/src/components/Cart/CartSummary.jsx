import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/cart/useCart";
const CartSummary = () => {
  const navigate = useNavigate();
  const {
    totalItems,
    subtotal,
    deliveryFee,
    grandTotal,
    loading,
    handleClearCart,
  } = useCart();

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <div className="cart-summary__body">
        <div className="cart-summary__row">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="cart-summary__row">
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>

        <div className="cart-summary__divider" />

        <div className="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="cart-summary__checkout-btn"
        type="button"
        onClick={() => navigate("/place-order")}
      >
        Proceed to Checkout
      </button>

      <button
        className="cart-summary__clear-btn"
        type="button"
        onClick={handleClearCart}
        disabled={loading.clearCart}
      >
        {loading.clearCart ? "Clearing..." : "Clear Cart"}
      </button>
    </aside>
  );
};

export default CartSummary;
