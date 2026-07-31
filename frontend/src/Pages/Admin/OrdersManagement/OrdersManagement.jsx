import { PackageCheck } from "lucide-react";
import { useEffect } from "react";

import useOrder from "../../../hooks/order/useOrder";

import OrderCard from "../../../components/Admin/OrderCard/OrderCard";

import "./OrdersManagement.css";

const OrdersManagement = () => {
  const { adminOrders, fetchAllOrders, updateOrderStatus, loading } =
    useOrder();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading.fetchAllOrders) {
    return (
      <section className="orders-management">
        <div className="orders-loading">
          <div className="loader"></div>
          <p>Loading Orders...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-management">
      {adminOrders.length === 0 ? (
        <div className="orders-empty">
          <PackageCheck size={60} />

          <h2>No Orders Yet</h2>

          <p>Orders placed by customers will appear here.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {adminOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              loading={loading}
              updateOrderStatus={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersManagement;
