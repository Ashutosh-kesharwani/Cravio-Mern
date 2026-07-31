import { Eye } from "lucide-react";

const RecentOrders = ({ recentOrders }) => {
  return (
    <section className="dashboard__orders">
      <div className="dashboard__orders-header">
        <h2>Recent Orders</h2>

        <button>View All</button>
      </div>

      <table className="dashboard__table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>
                No Orders Found
              </td>
            </tr>
          ) : (
            recentOrders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6).toUpperCase()}</td>

                <td>
                  {order.user
                    ? `${order.user.firstName} ${order.user.lastName}`
                    : `${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}`}
                </td>

                <td>₹{order.totalAmount.toLocaleString("en-IN")}</td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>

                <td>
                  <span
                    className={`dashboard__status dashboard__status--${order.orderStatus.replaceAll(
                      "_",
                      "-"
                    )}`}
                  >
                    {order.orderStatus.replaceAll("_", " ")}
                  </span>
                </td>

                <td>
                  <button className="dashboard__view-btn">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default RecentOrders;
