import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const weeklyData = [
  { day: "Mon", crews: 3, revenue: 8400 },
  { day: "Tue", crews: 4, revenue: 9100 },
  { day: "Wed", crews: 5, revenue: 11000 },
  { day: "Thu", crews: 4, revenue: 9800 },
  { day: "Fri", crews: 6, revenue: 13200 }
];

const payoutData = [
  { name: "Payroll", value: 42 },
  { name: "Materials", value: 26 },
  { name: "Subcontractors", value: 18 },
  { name: "Change Orders", value: 14 }
];

const TabContent = ({ tab, role }) => {
  if (tab === "dashboard") {
    return (
      <div className="tab-grid">
        <section className="card">
          <h3 className="card-title">Weekly Impact</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#ffffff20" vertical={false} />
                <XAxis dataKey="day" stroke="#0f172a" tickLine={false} />
                <YAxis yAxisId="left" stroke="#0f172a" tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#0f172a" tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#101827", borderRadius: 16, border: "1px solid #f1f5f9" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ color: "#0f172a" }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="crews"
                  stroke="url(#crewGradient)"
                  strokeWidth={4}
                  dot={{ r: 6, strokeWidth: 0 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#revenueGradient)"
                  strokeWidth={4}
                  dot={{ r: 6, strokeWidth: 0 }}
                />
                <defs>
                  <linearGradient id="crewGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="card">
          <h3 className="card-title">Payout Distribution</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <radialGradient id="sliceGradient" cx="0.5" cy="0.5" r="0.6">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#e7e5e4" stopOpacity={1} />
                  </radialGradient>
                </defs>
                <Pie
                  data={payoutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={4}
                >
                  {payoutData.map((entry, index) => (
                    <Cell key={entry.name} fill={index % 2 === 0 ? "url(#sliceGradient)" : "#facc15"} stroke="#fde68a" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ background: "#101827", borderRadius: 16, border: "1px solid #f1f5f9" }}
                  labelStyle={{ color: "#f8fafc" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="legend-list">
            {payoutData.map((item) => (
              <li key={item.name}>
                <span className="legend-dot" />
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-title">{tab.replace(/([A-Z])/g, " $1")}</h3>
      <p className="card-empty">Content for {tab} ({role}) is coming soon.</p>
    </div>
  );
};

export default TabContent;
