import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", revenue: 400 },
  { name: "Tue", revenue: 800 },
  { name: "Wed", revenue: 600 },
  { name: "Thu", revenue: 1200 },
  { name: "Fri", revenue: 900 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}