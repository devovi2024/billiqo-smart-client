export default function Analytics() {
  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Business performance overview and key metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Revenue</h2>
          <p className="text-2xl font-bold mt-2">$45,000</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Customers</h2>
          <p className="text-2xl font-bold mt-2">1,240</p>
        </div>

        <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow border dark:border-gray-800 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Growth</h2>
          <p className="text-2xl font-bold mt-2">18%</p>
        </div>

      </div>

    </div>
  );
}