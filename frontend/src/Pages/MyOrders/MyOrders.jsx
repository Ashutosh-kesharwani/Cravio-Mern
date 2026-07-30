import { useEffect } from "react";

import EmptyOrders from "../../components/MyOrders/EmptyOrders.jsx";
import { getOrderStatus } from "../../constants/order.constants";
import useOrder from "../../hooks/order/useOrder";

import "./MyOrders.css";

const MyOrders = () => {
  const { orders, fetchMyOrders, loading } = useOrder();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <section className="my-orders page">
      <div className="my-orders__container app">
        {/* ================= Header ================= */}

        <header className="my-orders__header">
          <div className="my-orders__header-content">
            <h1 className="my-orders__title">My Orders</h1>

            <p className="my-orders__subtitle">
              Track your recent orders, monitor delivery progress, and review
              your purchase history.
            </p>
          </div>

          {!loading.fetchOrders && (
            <div className="my-orders__count">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </div>
          )}
        </header>

        {/* ================= Content ================= */}

        <main className="my-orders__content">
          {loading.fetchOrders ? (
            <div className="my-orders-loading">
              <div className="loader" />
            </div>
          ) : orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <div className="orders-list">
              {orders.map((order) => {
                const status = getOrderStatus(order.orderStatus);
                const StatusIcon = status.icon;

                return (
                  <article className="order-card" key={order._id}>
                    {/* ================= Ordered Items ================= */}

                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div
                          className="order-item"
                          key={`${order._id}-${item.food?._id || item._id}-${index}`}
                        >
                          <img
                            src={item.food?.image?.url}
                            alt={item.food?.name}
                          />

                          <div className="order-item-info">
                            <h3>{item.food?.name}</h3>

                            <p>
                              ₹{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ================= Order Details ================= */}

                    <div className="order-details">
                      <p>
                        <strong>Total</strong>
                        <span>₹{order.totalAmount}</span>
                      </p>

                      <p>
                        <strong>Payment</strong>
                        <span className="payment-status">
                          {order.paymentStatus}
                        </span>
                      </p>

                      <p className="order-status">
                        <strong>Status</strong>

                        <span
                          className="status-badge"
                          style={{ color: status.color }}
                        >
                          <StatusIcon size={18} />
                          {status.label}
                        </span>
                      </p>

                      <p>
                        <strong>Ordered</strong>

                        <span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default MyOrders;
