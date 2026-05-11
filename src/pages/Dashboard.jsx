import StatCard from "../components/StatCard/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import { stats } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((item, i) => (
          <StatCard
            key={i}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}

      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
        <RevenueChart />
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">

        <h2 className="font-semibold text-lg mb-4">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* Head */}
            <thead>
              <tr className="text-left text-gray-500 border-b dark:border-gray-800">
                <th className="py-3">ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 dark:text-gray-200">

              <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="py-4 font-medium">#001</td>
                <td>John Doe</td>
                <td>$120</td>
                <td className="text-green-500 font-medium">
                  Paid
                </td>
              </tr>

              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="py-4 font-medium">#002</td>
                <td>Sarah</td>
                <td>$90</td>
                <td className="text-red-500 font-medium">
                  Pending
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}