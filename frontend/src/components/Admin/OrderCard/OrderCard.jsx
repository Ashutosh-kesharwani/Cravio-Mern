import {
  CalendarDays,
  CreditCard,
  Hash,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { getOrderStatus } from "../../../constants/order.constants";

import OrderItems from "../OrderItems/OrderItems";
import OrderStatus from "./OrderStatus";

import "./OrderCard.css";

const OrderCard = ({ order, loading, updateOrderStatus }) => {
  const status = getOrderStatus(order.orderStatus);
  const StatusIcon = status.icon;

  return (
    <article className="admin-order-card">
      {/* ================= HEADER ================= */}

      <header className="admin-order-header">
        <div>
          <h2 className="order-id">
            <Hash size={20} />
            Order #{order._id.slice(-8).toUpperCase()}
          </h2>

          <div className="order-date">
            <CalendarDays size={16} />
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="order-header-right">
          <div className="payment-badge">
            <CreditCard size={16} />
            {order.paymentStatus}
          </div>

          <div className="status-badge" style={{ color: status.color }}>
            <StatusIcon size={16} />
            {status.label}
          </div>
        </div>
      </header>

      {/* ================= BODY ================= */}

      <div className="admin-order-content">
        {/* LEFT */}

        <OrderItems items={order.items} />

        {/* RIGHT */}

        <aside className="admin-order-sidebar">
          <section className="admin-order-info-card">
            <h3>Delivery Information</h3>

            <div className="info-row">
              <User size={18} />
              <span>{order.deliveryAddress.firstName}</span>
            </div>

            <div className="info-row">
              <Phone size={18} />
              <span>{order.deliveryAddress.contactNumber}</span>
            </div>

            <div className="info-row address">
              <MapPin size={18} />
              <span>
                {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
                {order.deliveryAddress.state}, {order.deliveryAddress.country},{" "}
                {order.deliveryAddress.postalCode}
              </span>
            </div>

            <div className="order-summary">
              <div>
                <span>Total Amount </span>

                <strong>₹ {order.totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* ================= FOOTER ================= */}

      <OrderStatus
        order={order}
        loading={loading}
        updateOrderStatus={updateOrderStatus}
      />
    </article>
  );
};

export default OrderCard;
