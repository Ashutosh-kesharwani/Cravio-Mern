import { Pizza, Salad, Sandwich, Soup } from "lucide-react";

const DashboardAnalytics = ({ topSellingFoods, orderStatus }) => {
  const foodIcons = {
    pizza: <Pizza size={22} />,
    burger: <Sandwich size={22} />,
    sandwich: <Sandwich size={22} />,
    pasta: <Soup size={22} />,
    soup: <Soup size={22} />,
    salad: <Salad size={22} />,
  };

  const statusList = [
    {
      id: 1,
      label: "Pending",
      count: orderStatus.pending,
      className: "pending",
    },
    {
      id: 2,
      label: "Confirmed",
      count: orderStatus.confirmed,
      className: "confirmed",
    },
    {
      id: 3,
      label: "Processing",
      count: orderStatus.processing,
      className: "processing",
    },
    {
      id: 4,
      label: "Out for Delivery",
      count: orderStatus.out_for_delivery,
      className: "out-for-delivery",
    },
    {
      id: 5,
      label: "Delivered",
      count: orderStatus.delivered,
      className: "delivered",
    },
    {
      id: 6,
      label: "Cancelled",
      count: orderStatus.cancelled,
      className: "cancelled",
    },
  ];

  return (
    <section className="dashboard__analytics">
      {/* Popular Foods */}

      <article className="dashboard__analytics-card">
        <div className="dashboard__analytics-header">
          <h2>Top Selling Foods</h2>
        </div>

        <div className="dashboard__foods">
          {topSellingFoods.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            topSellingFoods.map((food) => {
              const icon = foodIcons[food.name.toLowerCase()] ?? (
                <Pizza size={22} />
              );

              return (
                <div key={food._id} className="dashboard__food">
                  <div className="dashboard__food-left">
                    <div className="dashboard__food-icon">{icon}</div>

                    <div>
                      <h4>{food.name}</h4>

                      <p>{food.totalSold} Orders</p>
                    </div>
                  </div>

                  <strong>₹{food.revenue.toLocaleString("en-IN")}</strong>
                </div>
              );
            })
          )}
        </div>
      </article>

      {/* Order Status */}

      <article className="dashboard__analytics-card">
        <div className="dashboard__analytics-header">
          <h2>Order Status</h2>
        </div>

        <div className="dashboard__status-list">
          {statusList.map((status) => (
            <div key={status.id} className="dashboard__status-item">
              <div className="dashboard__status-left">
                <span
                  className={`dashboard__status-dot dashboard__status-dot--${status.className}`}
                ></span>

                <span>{status.label}</span>
              </div>

              <strong>{status.count}</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default DashboardAnalytics;
