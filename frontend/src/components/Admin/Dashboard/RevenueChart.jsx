import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { MONTHS } from "../../../constants/admin.constants.js";

const RevenueChart = ({ revenueChart }) => {
  const chartData = revenueChart.map((item) => ({
    date: `${item.day} ${MONTHS[item.month - 1]}`,
    revenue: item.revenue,
  }));

  const totalRevenue = revenueChart.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <section className="dashboard__chart-card">
      <div className="dashboard__chart-header">
        <div>
          <h2>Revenue Overview</h2>
          <p>Last 7 days revenue</p>
        </div>

        <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
      </div>

      <div className="dashboard__chart">
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="cravioRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary-color)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="var(--border-color)" vertical={false} />

            <XAxis dataKey="date" tickLine={false} axisLine={false} />

            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary-color)"
              strokeWidth={3}
              fill="url(#cravioRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RevenueChart;
