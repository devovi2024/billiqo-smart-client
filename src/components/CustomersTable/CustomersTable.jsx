import { useEffect, useRef } from "react";
import SkeletonRow from "../components/skeletons/SkeletonRow";

export default function CustomersTable({
  customers,
  loading,
  query,
}) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && query.hasNextPage) {
        query.fetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [query]);

  return (
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
          {loading ? (
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
                <td className="p-3 font-semibold">${c.spent}</td>
              </tr>
            ))
          )}
        </tbody>

      </table>

      <div ref={loaderRef} className="h-10" />

      {query.isFetchingNextPage && (
        <p className="text-center text-gray-500 p-2">
          Loading more...
        </p>
      )}

      {!query.hasNextPage && (
        <p className="text-center text-gray-400 p-2">
          No more customers
        </p>
      )}
    </div>
  );
}