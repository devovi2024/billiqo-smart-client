import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import TransactionsTable from "../components/TransactionsTable/TransactionsTable";

export default function Transactions() {
  const [status, setStatus] = useState("all");

  const { data, isLoading } = useTransactions(status);

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Transactions</h2>

      {/* FILTER UI */}
      <div className="flex gap-2">

        {["all", "paid", "failed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 border rounded ${
              status === s ? "bg-black text-white" : ""
            }`}
          >
            {s}
          </button>
        ))}

      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden border dark:border-gray-800">

        {isLoading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <TransactionsTable data={data} />
        )}

      </div>

    </div>
  );
}