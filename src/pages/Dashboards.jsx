import { useDashboard } from "../hooks/useDashboard";

export default function Dashboards() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading dashboard</p>;

  const s = data?.data?.summary || {};

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <div>
        <p>Total Users: {s.totalUsers ?? 0}</p>
        <p>Total Customers: {s.totalCustomers ?? 0}</p>
        <p>Total Invoices: {s.totalInvoices ?? 0}</p>
        <p>Total Transactions: {s.totalTransactions ?? 0}</p>
        <p>Total Revenue: {s.totalRevenue ?? 0}</p>
      </div>
    </div>
  );
}