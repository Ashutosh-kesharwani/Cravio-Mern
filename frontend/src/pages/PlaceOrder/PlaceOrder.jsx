import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import { useStore } from "../../context/storeContext";
import "./PlaceOrder.css";
const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, user } = useStore();
  // token to cookie me hai
  //  url kha se lo ?
  const navigate = useNavigate();
  // Create a form state variable
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    contactNumber: "",
  });

  // Create a handleChange func
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  // When we submit the form , this func will get executed
  const placeOrder = async (event) => {
    event.preventDefault();

    // Before passing the data in api, we have to get all the items that user has uploaded in cart
    let orderItems = [];
    food_list.map((item) => {
      // check if our cartItems have product with this id , then add its food info into orderItems
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Create a orderData which we are going to send to our server in post req
    let orderData = {
      address: data,
      items: orderItems,
    };
    try {
      // orders/place
      const response = await api.post("/orders/place", orderData);
      if (response.data.success) {
        // If req was successfull , then we get session_url from server
        const { session_url } = response.data.data;

        // send user to this session url
        window.location.replace(session_url);
        toast(response.data.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  // To prevent user to go to orders page
  // If user is not authenticated
  // If cart is empty
  useEffect(() => {
    if (!user) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [user]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="First name"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Last name"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          required
          placeholder="Email address"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="State"
            name="state"
            value={data.state}
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="Zip code"
            name="zipcode"
            value={data.zipcode}
            onChange={handleChange}
          />
          <input
            type="text"
            required
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          required
          placeholder="Contact number"
          name="contactNumber"
          value={data.contactNumber}
          onChange={handleChange}
        />
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
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
