import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCustomers } from "../hooks/useCustomers";
import { useDebounce } from "../hooks/useDebounce";
import SkeletonRow from "../components/skeletons/SkeletonRow";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);
  const [, setParams] = useSearchParams();

  const query = useCustomers(debouncedSearch, page);

  const customers = query.data?.data ?? [];
  const totalPages = query.data?.totalPages ?? 1;

  const isLoading = query.status === "loading";

  return (
    <div className="p-6 space-y-4">

      <h2 className="text-xl font-bold">Customers</h2>

      <input
        className="border p-2 w-full rounded dark:bg-gray-900"
        value={search}
        placeholder="Search customer..."
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          setPage(1);
          setParams(value ? { search: value } : {});
        }}
      />

      <div className="border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Spent</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3 font-semibold">
                    ${c.spent}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINATION CONTROLS */}
      <div className="flex items-center justify-center gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
}