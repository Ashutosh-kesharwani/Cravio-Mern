import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios.js";
import { assets } from "../../assets/frontend_assets/assets.js";
import { useStore } from "../../context/storeContext.js";
import "./MyOrders.css";
const MyOrder = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { user } = useStore();
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders");
      setData(response.data.data.orders);
      console.log(response.data.data.orders);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchOrders();
  }, [user]); // check if user exist i.e it is authenticated

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {/* Render diff order done by user */}
        {data.map((order) => {
          return (
            <div key={order._id} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel icon" />
              {/* Render items ordered in each order doc */}
              <p>
                {order.items.map((item, index) => {
                  /* check if it is the last order , dont add comma , else add  */
                  /* Here we are returning itemName * itemQuantity */
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              {/*  order amount */}
              <p>Items : {order.items.length}</p>{" "}
              {/* Total Item : items quanity in each order */}
              <p>
                <span>&#x25cf;</span> <b>{order.orderStatus}</b>{" "}
                {/* orders status */}
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
