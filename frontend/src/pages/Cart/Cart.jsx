import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/storeContext";
import "./Cart.css";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount } =
    useStore();
  const navigate = useNavigate();
  return (
    <div className="cart">
      {/* ---------------- Cart Items ---------------- */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                {/* Using the same class so that data aligns exactly
                    under the column headings */}
                <div className="cart-items-title cart-items-item">
                  <img src={item.image?.url} alt={item.name} />
                  <p className="cart-items-item-name">{item.name}</p>
                  <p>&#x24;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>&#x24;{item.price * cartItems[item._id]}</p>

                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    &times;
                  </p>
                </div>

                <hr />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* =================== FIX START ===================
          cart-total and cart-promocode should BOTH be inside
          cart-bottom. You had closed cart-bottom before
          cart-promocode, which broke the layout.
      ==================================================== */}

      <div className="cart-bottom">
        {/* Left Side */}
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#x24;{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#x24;{getTotalCartAmount() !== 0 ? 10 : 0}</p>{" "}
              {/* Hardcode delivery fee */}
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total Amount</p>
              <p>
                &#x24;
                {getTotalCartAmount() !== 0 ? getTotalCartAmount() + 10 : 0}
              </p>
            </div>
          </div>

          {/* On click proceed to checkout navigate to place-order page */}
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Right Side */}
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>

            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== FIX END ==================== */}
    </div>
  );
};

export default Cart;
