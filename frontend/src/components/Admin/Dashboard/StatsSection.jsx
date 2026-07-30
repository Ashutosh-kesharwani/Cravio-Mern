import { IndianRupee, ShoppingBag, Users, UtensilsCrossed } from "lucide-react";

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      id: 1,
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag size={26} />,
      color: "orders",
    },
    {
      id: 2,
      title: "Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      icon: <IndianRupee size={26} />,
      color: "revenue",
    },
    {
      id: 3,
      title: "Customers",
      value: stats.totalCustomers,
      icon: <Users size={26} />,
      color: "customers",
    },
    {
      id: 4,
      title: "Foods",
      value: stats.totalFoods,
      icon: <UtensilsCrossed size={26} />,
      color: "products",
    },
  ];

  return (
    <section className="dashboard__stats">
      {statCards.map((stat) => (
        <article className="dashboard__stat-card" key={stat.id}>
          <div
            className={`dashboard__stat-icon dashboard__stat-icon--${stat.color}`}
          >
            {stat.icon}
          </div>

          <div className="dashboard__stat-content">
            <p className="dashboard__stat-title">{stat.title}</p>

            <h2 className="dashboard__stat-value">{stat.value}</h2>
          </div>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
