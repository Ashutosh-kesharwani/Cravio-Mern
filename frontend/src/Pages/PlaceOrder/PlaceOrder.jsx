import { useState } from "react";

import useCart from "../../hooks/cart/useCart.js";
import useOrder from "../../hooks/order/useOrder.js";
import "./PlaceOrder.css";

const INITIAL_DELIVERY_ADDRESS = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  contactNumber: "",
};

const PlaceOrder = () => {
  const { cart, subtotal, deliveryFee, grandTotal } = useCart();

  const { placeOrder, loading } = useOrder();

  const [deliveryAddress, setDeliveryAddress] = useState(
    INITIAL_DELIVERY_ADDRESS
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const response = await placeOrder({
      items: cart.items,
      deliveryAddress,
    });

    if (response?.sessionUrl) {
      window.location.href = response.sessionUrl;
    }
  };

  return (
    <section className="place-order">
      <form onSubmit={handlePlaceOrder} className="place-order-container">
        {/* Delivery Information */}

        <div className="delivery-info">
          <h2 className="section-title">Delivery Information</h2>

          <div className="input-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={deliveryAddress.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={deliveryAddress.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={deliveryAddress.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street"
            value={deliveryAddress.street}
            onChange={handleChange}
            required
          />

          <div className="input-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryAddress.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={deliveryAddress.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-row">
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={deliveryAddress.zipcode}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={deliveryAddress.country}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="tel"
            name="contactNumber"
            placeholder="Phone Number"
            value={deliveryAddress.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Order Summary */}

        <div className="order-summary">
          <h2 className="section-title">Cart Totals</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            type="submit"
            className="payment-btn"
            disabled={loading.placeOrder || cart.items.length === 0}
          >
            {loading.placeOrder ? "Redirecting..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
