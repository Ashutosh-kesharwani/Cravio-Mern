import { useStore } from "../../context/storeContext";
import "./PlaceOrder.css";
const PlaceOrder = () => {
  const { getTotalCartAmount } = useStore();

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Contact number" />
      </div>
      <div className="place-order-right">
        {/* Here cart total automatically inherit the style as we already define it in cart.css so as at time of render component everything got render so as css . so in placeorder.css we dont have to put style */}
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
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
