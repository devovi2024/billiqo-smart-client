import { useState } from "react";
import { customers } from "../data/customers";

export default function Customers() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">

      <h2 className="text-xl font-bold">
        Customers
      </h2>

      <input
        placeholder="Search customer..."
        className="border p-2 rounded w-full dark:bg-gray-900 dark:border-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden border dark:border-gray-800">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Total Spent</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 dark:text-gray-200">

              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.phone}</td>
                    <td className="p-3 font-semibold">
                      ${c.spent}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan="3">
                    No customers found
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