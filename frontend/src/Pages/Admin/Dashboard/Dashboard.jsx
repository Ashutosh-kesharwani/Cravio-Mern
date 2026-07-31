import "./Dashboard.css";

import {
  DashboardAnalytics,
  RecentOrders,
  RevenueChart,
  StatsCards,
} from "../../../components/Admin/index.js";
import "./Dashboard.css";

import useDashboard from "../../../hooks/admin/useDashboard.js";

const Dashboard = () => {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="dashboard">
      <StatsCards stats={dashboard.stats} />

      <RevenueChart revenueChart={dashboard.revenueChart} />

      <RecentOrders recentOrders={dashboard.recentOrders} />

      <DashboardAnalytics
        topSellingFoods={dashboard.topSellingFoods}
        orderStatus={dashboard.orderStatus}
      />
    </main>
  );
};

export default Dashboard;
