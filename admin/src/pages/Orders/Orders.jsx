import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets.js";
import { API_BASE_URL } from "../../config/constants.js";
import "./Orders.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/orders/admin/all-orders`
      );

      setOrders(response.data.data.orders);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  // This method is used for changing the status of order from admin portel
  const orderStatusHandler = async (event, orderId) => {
    try {
      const orderStatus = event.target.value;
      const response = await axios.patch(
        `${API_BASE_URL}/orders/admin/${orderId}/status`,
        { orderStatus }
      );

      // if response is success then , we are going to again call the fectch method to get the orderStatus for this order with updated value
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };
  // At time of reload , fetchAllOrders
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.contactNumber}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>

            {/* Use a select to change the order status
             */}
            <select
              name="orderStatus"
              id="orderStatus"
              value={order.orderStatus}
              onChange={(event) => orderStatusHandler(event, order._id)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="out_for_delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
