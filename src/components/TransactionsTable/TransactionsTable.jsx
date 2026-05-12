export default function TransactionsTable({ data = [] }) {
  const hasData = data.length > 0;

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>

          {hasData ? (
            data.map(({ id, customer, amount, status }) => (
              <tr key={id} className="border-t">
                <td className="p-3">{id}</td>
                <td className="p-3">{customer}</td>
                <td className="p-3 font-semibold">${amount}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}