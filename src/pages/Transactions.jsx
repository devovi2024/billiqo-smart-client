import { transactions } from "../data/transactions";

export default function Transactions() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        Transactions
      </h2>

      <div className="bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden border dark:border-gray-800">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>

              {transactions?.length > 0 ? (
                transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3 font-medium">{t.id}</td>
                    <td className="p-3">{t.customer}</td>
                    <td className="p-3 font-semibold">
                      ${t.amount}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          t.status === "paid"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No transactions found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}